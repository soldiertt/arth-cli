import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {SteelRestService} from '../../shared/service/rest/steel.rest.service';
import {GET_ALL, GetAllSuccess} from '../actions/steel.actions';

@Injectable()
export class SteelEffects {

  constructor(private actions$: Actions, private steelRestService: SteelRestService) {}

  getAll$  = createEffect(() => this.actions$.pipe(
    ofType(GET_ALL),
    mergeMap(action => this.steelRestService.listAll()),
    map(entities => new GetAllSuccess(entities))
  ));
}
