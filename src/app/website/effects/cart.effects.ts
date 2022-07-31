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
    ofType(CartDataActions.GetCartFromSession),
    map(() => this.sessionService.getCart()),
    map(cart => {
      if (cart) {
        return CartDataActions.InitializeCart({cart});
      } else {
        return CartDataActions.InitializeCart({cart: new Cart()});
      }
    })
  ));

  saveCart = createEffect(() => this.actions$.pipe(
    ofType(CartDataActions.SaveCartInSession),
    map((action) => this.sessionService.saveCart(action.cart)),
    map(cart => CartDataActions.CartSaved())
  ));
}
