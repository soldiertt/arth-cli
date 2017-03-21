import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from "@angular/core";
import Cart from "../../model/cart.class";
import {CartService} from "../../service/cart.service";
import Article from "../../model/article.class";
import {Router} from "@angular/router";
import {PaypalRestService} from "../../service/paypal.rest.service";
import {Auth0Service} from "../../service/auth.service";
import {PaypalOrderRestService} from "../../service/paypalorder.rest.service";
import PaypalOrder from "../../model/paypalorder.class";
import * as moment from "moment";
import {SessionService} from "../../service/session.service";
import {Observable} from "rxjs";

declare var paypal: any;

@Component({
  selector: 'arth-mycart',
  templateUrl: 'mycart.component.html',
  styleUrls: ['mycart.component.css']
})
export class MyCartComponent implements OnInit, AfterViewInit {

  @Input() step: number;
  cart: Cart;
  confirmed: boolean = false;
  loading: boolean = false;

  constructor(private cartService: CartService, private router: Router,
              private paypalRestService: PaypalRestService,
              private paypalOrderRestService: PaypalOrderRestService,
              private sessionService: SessionService,
              public authService: Auth0Service) { }

  ngOnInit() {
    this.cart = this.cartService.cart;
  }

  isNotOnStep(step: number) {
    return this.step !== step;
  }

  ngAfterViewInit() {

    if (window["paypal"]  && this.cart.orders.length > 0) {

      paypal.Button.render({
        env: 'sandbox', // Specify 'production' for the prod environment
        payment: (resolve, reject) => {

          this.paypalRestService.createPayment(this.cart).subscribe(response => {
            resolve(response.paymentID);
          }, err => reject(err));

        },

        onAuthorize: (data, actions) => {
          this._confirmPayment(data.paymentID, data.payerID);
        }

      }, '#paypal-button');

    }
  }

  removeOrder($event, articleId: number) {
    $event.preventDefault();
    this.cartService.removeOrder(articleId);
  }

  miniPicture(article): string {
    let picture = article.picture;
    let extension = picture.split('.').pop();
    let miniPicture = picture.substring(0, picture.lastIndexOf('.')) + 'm.' + extension;
    return 'assets/photos/' + article.type + '/' + miniPicture;
  }

  addArticle($event, article: Article ) {
    $event.preventDefault();
    this.cartService.addArticle(article);
  }

  removeArticle($event, articleId: number) {
    $event.preventDefault();
    this.cartService.removeArticle(articleId);
  }

  private _confirmPayment(paymentID: string, payerID: string) {
    this.loading = true;

    let paymentDetailsObs = this.paypalRestService.paymentDetails(paymentID);
    let executePaymentObs = this.paypalRestService.executePayment(paymentID, payerID);

    let parallelJobs: Array<Observable<any>> = [];
    parallelJobs.push(paymentDetailsObs);
    parallelJobs.push(executePaymentObs);

    Observable.forkJoin(parallelJobs).subscribe(responses => {
      let firstTx = responses[0].transactions[0];
      let items = firstTx.item_list.items;
      let total = firstTx.amount.total;

      let paypalOrder = new PaypalOrder();
      paypalOrder.userId = this.sessionService.getProfile().user_id;
      let orderDateMoment = moment(new Date());
      paypalOrder.orderDate = orderDateMoment.format('YYYY-MM-DD hh:mm:ss');
      paypalOrder.json = JSON.stringify({items: items, total: total});
      this.paypalOrderRestService.save(paypalOrder).subscribe((response) => {
        this.cartService.emptyCart();
      });
      this.confirmed = true;
      this.loading = false;
    }, err => this._goToErrorPage(err));

  }

  private _goToErrorPage(err: string) {
    console.log("Go to error page");
    this.router.navigate(['/error']);
  }

}
