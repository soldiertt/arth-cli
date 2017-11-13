import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SessionService} from '../../shared/service/session.service';
import {CartDataActions} from '../actions/cart-data.actions';

@Injectable()
export class CartEffects {

  constructor(private actions: Actions, private sessionService: SessionService) {}

  @Effect()
  getCartFromSession: Observable<Action> = this.actions.ofType(CartDataActions.GET_CART_FROM_SESSION)
    .map(action => this.sessionService.getCart())
    .map(cart => new CartDataActions.InitializeCart(cart));

  @Effect()
  saveCart: Observable<Action> = this.actions.ofType(CartDataActions.SAVE_CART_IN_SESSION)
    .map((action: CartDataActions.SaveCartInSession) => this.sessionService.saveCart(action.cart))
    .map(cart => new CartDataActions.CartSaved());
}
