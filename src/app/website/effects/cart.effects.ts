import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SessionService} from '../../shared/service/session.service';
import {
  CartSaved, GET_CART_FROM_SESSION, InitializeCart, SAVE_CART_IN_SESSION,
  SaveCartInSession
} from '../actions/cart-data.actions';

@Injectable()
export class CartEffects {

  constructor(private actions: Actions, private sessionService: SessionService) {}

  @Effect()
  getCartFromSession: Observable<Action> = this.actions.ofType(GET_CART_FROM_SESSION)
    .map(action => this.sessionService.getCart())
    .map(cart => new InitializeCart(cart));

  @Effect()
  saveCart: Observable<Action> = this.actions.ofType(SAVE_CART_IN_SESSION)
    .map((action: SaveCartInSession) => this.sessionService.saveCart(action.cart))
    .map(cart => new CartSaved());
}
