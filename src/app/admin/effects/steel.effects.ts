import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {SteelRestService} from '../../shared/service/rest/steel.rest.service';
import {SteelActions} from '../actions/steel.actions';

@Injectable()
export class SteelEffects {
  private actions$ = inject(Actions);
  private steelRestService = inject(SteelRestService);


  getAll$  = createEffect(() => this.actions$.pipe(
    ofType(SteelActions.GetAll),
    mergeMap(action => this.steelRestService.listAll()),
    map(entities => SteelActions.GetAllSuccess({entities}))
  ));
}
