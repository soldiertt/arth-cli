import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {PaypalOrderRestService} from '../service/rest/paypalorder.rest.service';
import {PaypalOrderActions} from '../actions/paypal-order.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private orderRestService = inject(PaypalOrderRestService);


  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(PaypalOrderActions.GetAll),
    mergeMap(action => this.orderRestService.listAll()),
    map(entities => PaypalOrderActions.GetAllSuccess({entities}))
  ));


}
