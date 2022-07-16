import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SessionService} from '../../shared/service/session.service';
import {CartDataActions} from '../actions/cart-data.actions';
import {map} from 'rxjs/operators';
import Cart from '../model/cart.class';

@Injectable()
export class CartEffects {

  constructor(private actions$: Actions, private sessionService: SessionService) {}

  getCartFromSession$ = createEffect(() => this.actions$.pipe(
    ofType(CartDataActions.GET_CART_FROM_SESSION),
    map(() => this.sessionService.getCart()),
    map(cart => {
      if (cart) {
        return new CartDataActions.InitializeCart(cart);
      } else {
        return new CartDataActions.InitializeCart(new Cart());
      }
    })
  ));

  saveCart = createEffect(() => this.actions$.pipe(
    ofType(CartDataActions.SAVE_CART_IN_SESSION),
    map((action: CartDataActions.SaveCartInSession) => this.sessionService.saveCart(action.cart)),
    map(cart => new CartDataActions.CartSaved())
  ));
}
