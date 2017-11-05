import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {PaypalOrderRestService} from '../../shared/service/rest/paypalorder.rest.service';
import {GET_ALL, GetAllSuccess} from '../actions/order.actions';

@Injectable()
export class OrderEffects {

  constructor(private actions: Actions, private orderRestService: PaypalOrderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.orderRestService.listAll())
    .map(entities => new GetAllSuccess(entities));
}
