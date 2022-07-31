import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {PaypalOrderRestService} from '../service/rest/paypalorder.rest.service';
import {PaypalOrderActions} from '../actions/paypal-order.actions';

@Injectable()
export class OrderEffects {

  constructor(private actions$: Actions, private orderRestService: PaypalOrderRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(PaypalOrderActions.GetAll),
    mergeMap(action => this.orderRestService.listAll()),
    map(entities => PaypalOrderActions.GetAllSuccess({entities}))
  ));


}
