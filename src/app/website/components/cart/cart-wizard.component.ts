import {Component, OnInit} from "@angular/core";
import {Auth0Service} from '../../../shared/service/auth.service';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import * as fromCartData from '../../reducers/cart-data.reducer';
import * as fromProfile from '../../../root/reducers/user-profile.reducer';
import {Observable} from 'rxjs/Observable';
import UserProfile from '../../model/user-profile.class';
import {AddressCompleted, AddressIncomplete, CartMoveToStep} from '../../actions/cart-data.actions';

@Component({
  templateUrl: 'cart-wizard.component.html'
})
export class CartWizardComponent implements OnInit {

  cartData$: Observable<CartData>;

  constructor(private store: Store<CartData>,
              private profileStore: Store<UserProfile>,
              public authService: Auth0Service) {}

  ngOnInit() {
    this.cartData$ = this.store.select(fromCartData.selectLocalState);
    this.profileStore.select(fromProfile.selectLocalState).subscribe(profile => {
      if (profile.user_metadata && profile.user_metadata.addresses
        && profile.user_metadata.addresses.delivery && profile.user_metadata.profileComplete) {
        this.store.dispatch(new AddressCompleted());
      } else {
        this.store.dispatch(new AddressIncomplete());
      }
    });
    this.cartData$.take(1).subscribe(cartData => {
      if (cartData.cart.totalCount > 0) {
        if (this.authService.authenticated()) {
          this.store.dispatch(new CartMoveToStep(2));
        } else {
          this.store.dispatch(new CartMoveToStep(1));
        }
      } else {
        this.store.dispatch(new CartMoveToStep(0));
      }
    });
  }

}
