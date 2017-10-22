import {AfterViewInit, Component, OnInit} from "@angular/core";
import {CartService} from "../../service/cart.service";
import {Auth0Service} from "../../service/auth.service";
import {PaypalRestService} from "../../service/paypal.rest.service";
import {PaypalOrderRestService} from "../../service/paypalorder.rest.service";
import PaypalOrder from "../../model/paypalorder.class";
import * as moment from "moment";
import {Router} from "@angular/router";
import AppData from '../../model/app-data';
import {DataService} from '../../service/data.service';
import {Actions} from '../../model/actions.class';
import {ArticleRestService} from "app/service/article.rest.service";
import Mail from '../../model/mail.class';
import {environment} from '../../../environments/environment';
import {MailService} from '../../service/mail.service';
import {I18nService} from '../../i18n/i18n.service';

declare var paypal: any;

@Component({
  selector: 'arth-cart-navigation',
  templateUrl: './cart-navigation.component.html',
  styleUrls: ['./cart-navigation.component.css']
})
export class CartNavigationComponent implements  OnInit, AfterViewInit {

  appData : AppData;

  displayPrevious: boolean;
  displayNext: boolean;
  displayPaypalButton: boolean = false;
  processingPayment: boolean = false;
  paymentConfirmed: boolean = false;

  constructor(private dataService: DataService,
              private cartService: CartService,
              public authService: Auth0Service,
              private paypalRestService: PaypalRestService,
              private paypalOrderRestService: PaypalOrderRestService,
              private articleRestService: ArticleRestService,
              private mailService: MailService,
              private i18nService: I18nService,
              private router: Router) {}

  ngOnInit() {
    this.dataService.appData.subscribe(data => {
      this.appData = data;
      this._checkButtonDisplay();
    });
  }

  onPrevious(): void {
    if (this.appData.cart.totalCount > 0) {
      if (this.authService.authenticated()) {
        if (this.appData.cartWizard.currentStep === 4) {
          this.dataService.doAction(Actions.CART_MOVE_TO_STEP, 3);
        }
      }
    }
  }

  onNext($event): void {
    const curStep = this.appData.cartWizard.currentStep;
    if (curStep !== 0) {
      if (curStep === 1) {
        this.authService.login($event, () => this.dataService.doAction(Actions.CART_MOVE_TO_STEP, 3));
      } else if (curStep === 2) {
        this.dataService.doAction(Actions.CART_MOVE_TO_STEP, 3);
      } else if (curStep === 3) {
        if (this.appData.cartWizard.addressCompleted) {
          this.dataService.doAction(Actions.CART_MOVE_TO_STEP, 4);
        }
      }
    }
  }

  ngAfterViewInit() {
    let paypalDefinedInterval = setInterval(() => {

      if (window["paypal"]  && this.appData.cart.orders.length > 0) {

        paypal.Button.render({
          env: environment.paypalEnvironment,
          payment: (resolve, reject) => {

            this.paypalRestService.createPayment(this.appData.cart).subscribe(response => {
              resolve(response.paymentID);
            }, err => reject(err));

          },

          onAuthorize: (data, actions) => {
            this._confirmPayment(data.paymentID, data.payerID);
          }

        }, '#paypal-button');

        if (paypalDefinedInterval) {
          clearInterval(paypalDefinedInterval);
        }
      }
    }, 100);
  }

  private _checkButtonDisplay(): void {
    if (this.appData.cart.totalCount > 0) {
      if (this.authService.authenticated()) {
        if (this.appData.cartWizard.currentStep === 4) {
          // Step4. paying
          this.displayPrevious = true;
          this.displayNext = false;
          this.displayPaypalButton = true;
        } else if (this.appData.cartWizard.currentStep === 3){
          if (this.appData.cartWizard.addressCompleted) {
            // Step3. completed profile
            this.displayPrevious = false;
            this.displayNext = true;
            this.displayPaypalButton = false;
          } else {
            // Step3. Editing profile
            this.displayPrevious = false;
            this.displayNext = false;
            this.displayPaypalButton = false;
          }
        } else if (this.appData.cartWizard.currentStep === 2){
          // Step2. just authenticated
          this.displayPrevious = false;
          this.displayNext = true;
          this.displayPaypalButton = false;
        }
      } else {
        // Step1. not authenticated
        this.displayPrevious = false;
        this.displayNext = true;
        this.displayPaypalButton = false;
      }
    } else {
      // No item in cart
      this.displayNext = false;
      this.displayPrevious = false;
      this.displayPaypalButton = false;
    }
  }

  private _confirmPayment(paymentID: string, payerID: string) {
    this.processingPayment = true;

    // update top sales
    const orders = this.appData.cart.orders;
    this.articleRestService.updateTopSales(orders).subscribe();

    this.cartService.emptyCart();
    this._checkButtonDisplay();

    // execute payment
    this.paypalRestService.executePayment(paymentID, payerID).subscribe(response => {
      let firstTx = response.transactions[0];
      let items = firstTx.item_list.items;
      let amount = firstTx.amount;

      let paypalOrder = new PaypalOrder();
      paypalOrder.userId = this.appData.profile.user_id;
      paypalOrder.orderDate = moment().format('YYYY-MM-DD hh:mm:ss');
      paypalOrder.json = JSON.stringify({items, amount});
      this.paypalOrderRestService.save(paypalOrder).subscribe(_ => {
        this.paymentConfirmed = true;
        this.processingPayment = false;
      });

      // Send mail to admin
      let mail: Mail = new Mail("ADMIN_PAYMENT_CONFIRMATION");
      mail.parameters = {paypalOrder};
      this.mailService.sendMail(this.appData.profile.user_id, mail).subscribe(resp => {
        console.log("Mail sent !");
      });
      // Send mail to client
      mail = new Mail("USER_PAYMENT_CONFIRMATION");
      mail.parameters = {paypalOrder : paypalOrder, language: this.i18nService.currentLanguage};
      this.mailService.sendMail(this.appData.profile.user_id, mail).subscribe(resp => {
        console.log("Mail sent !");
      });
    }, err => this._goToErrorPage(err));

  }

  private _goToErrorPage(err: string) {
    console.log("Go to error page");
    this.router.navigate(['/error']);
  }

}
