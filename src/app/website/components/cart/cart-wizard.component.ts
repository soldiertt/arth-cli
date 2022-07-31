
import {take} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Auth0Service} from '../../../shared/service/auth.service';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';


import {CartDataActions} from '../../actions/cart-data.actions';
import {FromCartData} from '../../reducers/cart-data.reducer';

@Component({
  templateUrl: 'cart-wizard.component.html'
})
export class CartWizardComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  cartData$: Observable<CartData>;

  constructor(private store: Store<CartData>,
              public authService: Auth0Service) {}

  ngOnInit() {
    this.cartData$ = this.store.select(FromCartData.selectLocalState);
    this.cartData$.pipe(take(1)).subscribe(cartData => {
      if (cartData.cart.totalCount > 0) {
        if (this.authService.authenticated()) {
          this.store.dispatch(CartDataActions.CartMoveToStep({step: 2}));
        } else {
          this.store.dispatch(CartDataActions.CartMoveToStep({step: 1}));
        }
      } else {
        this.store.dispatch(CartDataActions.CartMoveToStep({step: 0}));
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
