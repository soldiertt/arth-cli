import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {map, mergeMap} from 'rxjs/operators';
import {PaypalOrderRestService} from '../service/rest/paypalorder.rest.service';
import {PaypalOrderActions} from '../actions/paypal-order.actions';

@Injectable()
export class OrderEffects {

  constructor(private actions: Actions, private orderRestService: PaypalOrderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(PaypalOrderActions.GET_ALL).pipe(
    mergeMap(action => this.orderRestService.listAll()),
    map(entities => new PaypalOrderActions.GetAllSuccess(entities)));


}
