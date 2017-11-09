import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {GET_ALL, GetAllSuccess} from '../actions/steel.actions';
import {SteelRestService} from '../../shared/service/rest/steel.rest.service';

@Injectable()
export class SteelEffects {

  constructor(private actions: Actions, private steelRestService: SteelRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.steelRestService.listAll())
    .map(entities => new GetAllSuccess(entities));
}
