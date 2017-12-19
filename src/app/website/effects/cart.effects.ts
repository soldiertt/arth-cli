import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SessionService} from '../../shared/service/session.service';
import {CartDataActions} from '../actions/cart-data.actions';
import {map} from 'rxjs/operators';
import Cart from '../model/cart.class';

@Injectable()
export class CartEffects {

  constructor(private actions: Actions, private sessionService: SessionService) {}

  @Effect()
  getCartFromSession: Observable<Action> = this.actions.ofType(CartDataActions.GET_CART_FROM_SESSION)
    .pipe(
      map(() => this.sessionService.getCart()),
      map(cart => {
        if (cart) {
          return new CartDataActions.InitializeCart(cart);
        } else {
          return new CartDataActions.InitializeCart(new Cart());
        }
      })
    );

  @Effect()
  saveCart: Observable<Action> = this.actions.ofType(CartDataActions.SAVE_CART_IN_SESSION)
    .pipe(
      map((action: CartDataActions.SaveCartInSession) => this.sessionService.saveCart(action.cart)),
      map(cart => new CartDataActions.CartSaved())
    );
}
