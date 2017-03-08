import {Component, OnInit, ElementRef, Input, Output, EventEmitter} from "@angular/core";
import Cart from "../../model/cart.class";
import {CartService} from "../../service/cart.service";
import Article from "../../model/article.class";
import {ActivatedRoute, UrlSegment, Router} from "@angular/router";
import {PaypalRestService} from "../../service/paypal.rest.service";
import {Auth0Service} from "../../service/auth.service";

declare var paypal: any;

@Component({
  selector: 'arth-mycart',
  templateUrl: 'mycart.component.html',
  styleUrls: ['mycart.component.css']
})
export class MyCartComponent implements OnInit {

  @Input() step: number;
  @Output() paymentConfirmed: EventEmitter<any> = new EventEmitter();
  cart: Cart;

  constructor(private cartService: CartService, private router: Router, private paypalRestService: PaypalRestService, public authService: Auth0Service) { }

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
          this.paymentConfirmed.emit({paymentID: data.paymentID, payerID: data.payerID});
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

}
