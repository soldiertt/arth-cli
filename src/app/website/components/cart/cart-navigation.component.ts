import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Auth0Service} from "../../../shared/service/auth.service";
import {PaypalRestService} from "../../../shared/service/rest/paypal.rest.service";
import {environment} from '../../../../environments/environment';
import {ProfileService} from '../../service/profile.service';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import * as fromCartData from '../../reducers/cart-data.reducer';
import * as fromProfile from '../../../root/reducers/user-profile.reducer';
import {CartMoveToStep, Pay, UpdateTopSales} from '../../actions/cart-data.actions';
import UserProfile from '../../model/user-profile.class';

declare var paypal: any;

@Component({
  selector: 'arth-cart-navigation',
  templateUrl: './cart-navigation.component.html',
  styleUrls: ['./cart-navigation.component.css']
})
export class CartNavigationComponent implements  OnInit, AfterViewInit {

  cartData : CartData;
  country: string;
  userId: string;

  displayPrevious: boolean;
  displayNext: boolean;
  displayPaypalButton: boolean = false;
  processingPayment: boolean = false;
  paymentConfirmed: boolean = false;

  constructor(private store: Store<CartData>,
              private profileStore: Store<UserProfile>,
              public authService: Auth0Service,
              private profileService: ProfileService,
              private paypalRestService: PaypalRestService) {}

  ngOnInit() {
    this.store.select(fromCartData.selectLocalState).subscribe(cartData => {
      this.cartData = cartData;
      this._checkButtonDisplay();
    });
    this.profileStore.select(fromProfile.selectLocalState).subscribe(profile => {
      this.country = profile.user_metadata.addresses.delivery.country;
      this.userId = profile.user_id;
    });
  }

  onPrevious(): void {
    if (this.cartData.cart.totalCount > 0) {
      if (this.authService.authenticated()) {
        if (this.cartData.wizard.currentStep === 4) {
          this.store.dispatch(new CartMoveToStep(3));
        }
      }
    }
  }

  onNext($event): void {
    const curStep = this.cartData.wizard.currentStep;
    if (curStep !== 0) {
      if (curStep === 1) {
        this.profileService.login($event, () => {
          this.store.dispatch(new CartMoveToStep(3));
        });
      } else if (curStep === 2) {
        this.store.dispatch(new CartMoveToStep(3));
      } else if (curStep === 3) {
        if (this.cartData.wizard.addressCompleted) {
          this.store.dispatch(new CartMoveToStep(4, this.country));
        }
      }
    }
  }

  ngAfterViewInit() {
    let paypalDefinedInterval = setInterval(() => {

      if (window["paypal"]  && this.cartData.cart.orders.length > 0) {

        paypal.Button.render({
          env: environment.paypalEnvironment,
          payment: (resolve, reject) => {

            this.paypalRestService.createPayment(this.cartData.cart).subscribe(response => {
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
    if (this.cartData.cart.totalCount > 0) {
      if (this.authService.authenticated()) {
        if (this.cartData.wizard.currentStep === 4) {
          // Step4. paying
          this.displayPrevious = true;
          this.displayNext = false;
          this.displayPaypalButton = true;
        } else if (this.cartData.wizard.currentStep === 3){
          if (this.cartData.wizard.addressCompleted) {
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
        } else if (this.cartData.wizard.currentStep === 2){
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
    const orders = this.cartData.cart.orders;

    this.store.dispatch(new UpdateTopSales());
    this.store.dispatch(new Pay(this.userId, orders, paymentID, payerID));

    this.paymentConfirmed = true;
    this.processingPayment = false;

    this._checkButtonDisplay();

  }

}
