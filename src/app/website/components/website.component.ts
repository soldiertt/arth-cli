import {Component} from '@angular/core';
import CartData from '../model/cart-data.class';
import {Store} from '@ngrx/store';
import {GetCartFromSession, SaveCartInSession} from '../actions/cart-data.actions';
import * as fromCartData from '../reducers/cart-data.reducer';

@Component({
  templateUrl: './website.component.html',
})
export class WebsiteComponent {

  constructor(private store: Store<CartData>) {
    this.store.dispatch(new GetCartFromSession())

    this.store.select(fromCartData.selectCartState).subscribe(cart => {
      this.store.dispatch(new SaveCartInSession(cart));
    });
  }
}
