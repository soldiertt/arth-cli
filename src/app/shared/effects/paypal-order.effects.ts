import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {PaypalOrderRestService} from '../service/rest/paypalorder.rest.service';
import {PaypalOrderActions} from '../actions/paypal-order.actions';

@Injectable()
export class OrderEffects {

  constructor(private actions: Actions, private orderRestService: PaypalOrderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(PaypalOrderActions.GET_ALL)
    .mergeMap(action => this.orderRestService.listAll())
    .map(entities => new PaypalOrderActions.GetAllSuccess(entities));


}
