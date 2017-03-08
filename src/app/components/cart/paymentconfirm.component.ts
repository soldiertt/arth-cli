import {Component, OnInit, NgZone, Input} from "@angular/core";
import {Router} from "@angular/router";
import {PaypalRestService} from "../../service/paypal.rest.service";
import PaypalOrder from "../../model/paypalorder.class";
import * as moment from "moment";
import {PaypalOrderRestService} from "../../service/paypalorder.rest.service";
import {CartService} from "../../service/cart.service";
import {SessionService} from "../../service/session.service";

declare var paypal: any;

@Component({
  selector: 'arth-payment-confirm',
  templateUrl: 'paymentconfirm.component.html',
  styleUrls: ['mycart.component.css']
})
export class PaymentConfirmComponent implements OnInit {
  @Input() paymentData: any;
  items: any[] = [];
  total: any;
  payer: any;
  confirmed: boolean = false;
  loading: boolean = true;
  paymentState: string;

  constructor(private paypalRestService: PaypalRestService,
              private paypalOrderRestService: PaypalOrderRestService,
              private sessionService: SessionService,
              private cartService: CartService,
              private zone:NgZone,
              private router: Router) { }

  ngOnInit() {

    this.paypalRestService.paymentDetails(this.paymentData.paymentID).subscribe(response => {
      let firstTx = response.transactions[0];
      this.zone.run(() => {
        this.paymentState = response.state;
        this.payer = response.payer.payer_info;
        this.items = firstTx.item_list.items;
        this.total = firstTx.amount.total;
        this.loading = false;
      });

    }, err => this.goToErrorPage(err));

  }

  needToConfirm(): boolean {
    return !this.confirmed && this.paymentState !== 'approved';
  }

  confirmPayment() {
    this.loading = true;
    this.paypalRestService.executePayment(this.paymentData.paymentID, this.paymentData.payerID).subscribe(response => {
      let paypalOrder = new PaypalOrder();
      paypalOrder.userId = this.sessionService.getProfile().user_id;
      let orderDateMoment = moment(new Date());
      paypalOrder.orderDate = orderDateMoment.format('YYYY-MM-DD hh:mm:ss');
      paypalOrder.json = JSON.stringify({items: this.items, total: this.total});
      this.paypalOrderRestService.save(paypalOrder).subscribe((response) => {
        this.cartService.emptyCart();
      });
      this.confirmed = true;
      this.loading = false;
    }, err => this.goToErrorPage(err));

  }

  goToErrorPage(err: string) {
    console.log("Go to error page");
    this.router.navigate(['/error']);
  }
}
