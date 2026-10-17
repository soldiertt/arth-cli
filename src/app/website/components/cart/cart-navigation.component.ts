import {take} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AfterViewInit, Component, DestroyRef, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {Auth0Service} from '../../../shared/service/auth.service';
import {PaypalRestService} from '../../../shared/service/rest/paypal.rest.service';
import {PaypalSdkService} from '../../service/paypal-sdk.service';
import {environment} from '../../../../environments/environment';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import UserProfile from '../../model/user-profile.class';
import {firstValueFrom} from 'rxjs';
import {CartDataActions} from '../../actions/cart-data.actions';
import {FromCartData} from '../../reducers/cart-data.reducer';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-cart-navigation',
    templateUrl: './cart-navigation.component.html',
    styleUrls: ['./cart-navigation.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [I18nPipe]
})
export class CartNavigationComponent implements OnInit, AfterViewInit {
  private store = inject<Store<CartData>>(Store);
  private profileStore = inject<Store<UserProfile>>(Store);
  private actions$ = inject(Actions);
  authService = inject(Auth0Service);
  private paypalRestService = inject(PaypalRestService);
  private paypalSdkService = inject(PaypalSdkService);
  private destroyRef = inject(DestroyRef);


  cartData: CartData;
  country: string;
  userId: string;
  profileComplete: boolean;

  displayPrevious: boolean;
  displayNext: boolean;
  displayPaypalButton: boolean = false;
  processingPayment: boolean = false;
  paymentConfirmed: boolean = false;
  paymentError: boolean = false;

  private viewReady = false;
  private paypalButtonReady = false;
  private paypalSession: any;

  ngOnInit() {
    this.store.select(FromCartData.selectLocalState).pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe(cartData => {
        this.cartData = cartData;
        this._checkButtonDisplay();
      });
    this.profileStore.select(FromProfile.selectLocalState).pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe(profile => {
        if (profile) {
          if (profile.user_metadata) {
            this.profileComplete = profile.user_metadata.profileComplete!;
            if (profile.user_metadata.addresses) {
              this.country = profile.user_metadata.addresses.delivery.country;
            } else {
              this.country = undefined;
            }
          } else {
            this.profileComplete = false;
          }
          this.userId = profile.user_id;
        } else {
          this.userId = undefined;
          this.country = undefined;
          this.profileComplete = false;
        }
      });

    this.actions$.pipe(
      ofType(CartDataActions.PaySuccess),
      takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.processingPayment = false;
        this.paymentConfirmed = true;
        this.paymentError = false;
      });

    this.actions$.pipe(
      ofType(CartDataActions.PayFailure),
      takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.processingPayment = false;
        this.paymentConfirmed = false;
        this.paymentError = true;
      });
  }

  onPrevious(): void {
    if (this.cartData.cart.totalCount > 0) {
      if (this.authService.authenticated()) {
        if (this.cartData.wizard.currentStep === 4) {
          this.store.dispatch(CartDataActions.CartMoveToStep({step: 3}));
        } else if (this.cartData.wizard.currentStep === 3 && !this.cartData.wizard.editMode) {
          this.store.dispatch(CartDataActions.CartMoveToStep({step: 2}));
        }
      }
    }
  }

  onNext($event): void {
    const curStep = this.cartData.wizard.currentStep;
    if (curStep !== 0) {
      if (curStep === 1) {
        if (this.authService.authenticated()) {
          this.store.dispatch(CartDataActions.CartMoveToStep({step: 3}));
        } else {
          this.authService.login();
        }
      } else if (curStep === 2) {
        this.store.dispatch(CartDataActions.CartMoveToStep({step: 3}));
      } else if (curStep === 3) {
        this.store.dispatch(CartDataActions.CartMoveToStep({step: 4, country: this.country}));
      }
    }
  }

  ngAfterViewInit() {
    this.viewReady = true;
    this._checkButtonDisplay();
  }

  private _checkButtonDisplay(): void {
    if (!this.cartData) {
      return;
    }
    if (this.cartData.cart.totalCount > 0) {
      if (this.authService.authenticated()) {
        if (this.cartData.wizard.currentStep === 4) {
          // Step4. paying
          this.displayPrevious = true;
          this.displayNext = false;
          this.displayPaypalButton = true;
          void this._initPaypal();
        } else if (this.cartData.wizard.currentStep === 3) {
          if (!this.cartData.wizard.editMode && this.profileComplete) {
            // Step3. completed profile
            this.displayPrevious = true;
            this.displayNext = true;
            this.displayPaypalButton = false;
          } else {
            // Step3. Editing profile
            this.displayPrevious = false;
            this.displayNext = false;
            this.displayPaypalButton = false;
          }
        } else if (this.cartData.wizard.currentStep === 2) {
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

  private async _initPaypal(): Promise<void> {
    if (this.paypalButtonReady || !this.viewReady || !this.displayPaypalButton) {
      return;
    }
    const container = document.getElementById('paypal-button');
    if (!container) {
      return;
    }
    this.paypalButtonReady = true;
    try {
      const paypal = await this.paypalSdkService.load();
      const sdkInstance = await paypal.createInstance({
        clientId: environment.paypalClientId,
        components: ['paypal-payments'],
        pageType: 'checkout'
      });
      const eligibility = await sdkInstance.findEligibleMethods({currencyCode: 'EUR'});
      if (!eligibility.isEligible('paypal')) {
        this.paypalButtonReady = false;
        return;
      }
      this.paypalSession = await sdkInstance.createPayPalOneTimePaymentSession({
        onApprove: (data: any) => this._onApprove(data),
        onCancel: () => this._onCancel(),
        onError: (err: any) => this._onError(err)
      });
      const button = document.createElement('paypal-button');
      container.replaceChildren(button);
      button.addEventListener('click', () => this._startPayment());
    } catch (err) {
      console.error('PayPal initialization failed', err);
      this.paypalButtonReady = false;
    }
  }

  private _startPayment(): void {
    if (!this.paypalSession || !this.cartData || !this.cartData.cart.orders.length) {
      return;
    }
    this.paymentError = false;
    const createOrderPromise = firstValueFrom(this.paypalRestService.createOrder(this.cartData.cart))
      .then(response => ({orderId: response.id}));
    void this.paypalSession.start({presentationMode: 'auto'}, createOrderPromise);
  }

  private _onApprove(data: any): Promise<void> {
    if (!this.cartData) {
      return Promise.resolve();
    }
    this.processingPayment = true;
    this.paymentConfirmed = false;

    const settled$ = firstValueFrom(this.actions$.pipe(
      ofType(CartDataActions.PaySuccess, CartDataActions.PayFailure),
      take(1)));

    // update top sales
    const orders = this.cartData.cart.orders;

    this.store.dispatch(CartDataActions.UpdateTopSales({orders}));
    this.store.dispatch(CartDataActions.Pay({
      userId: this.userId,
      orders,
      orderID: data.orderId,
      payerID: data.payerId
    }));

    return settled$.then(action => {
      if (action.type === CartDataActions.PayFailure.type) {
        throw new Error('Payment capture failed');
      }
    });
  }

  private _onCancel(): void {
    this.processingPayment = false;
  }

  private _onError(err: any): void {
    console.error('PayPal payment error', err);
    this.processingPayment = false;
    this.paymentError = true;
  }

}
