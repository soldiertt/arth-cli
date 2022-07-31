
import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdvancedProductActions} from '../actions/advanced-product.actions';
import CartData from '../model/cart-data.class';
import {Store} from '@ngrx/store';
import {CartDataActions} from '../actions/cart-data.actions';
import {Subject} from 'rxjs';

import {ProfileActions} from '../../root/actions/user-profile.actions';
import {FromCartData} from '../reducers/cart-data.reducer';

@Component({
  templateUrl: './website.component.html',
})
export class WebsiteComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private store: Store<CartData>) { }

  ngOnInit() {
    // Initialize Cart from local storage
    this.store.dispatch(CartDataActions.GetCartFromSession());

    // Save cart to local storage as soon as it is updated
    this.store.select(FromCartData.selectCartState).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(cart => {
        this.store.dispatch(CartDataActions.SaveCartInSession({cart}));
    });

    // Initialize Profile from local storage (if any)
    this.store.dispatch(ProfileActions.InitFromSession());

    // Load advanced products
    this.store.dispatch(AdvancedProductActions.LoadAll());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
