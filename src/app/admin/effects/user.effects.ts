import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {UserActions} from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userRestService: UserRestService) {}

  getAll$  = createEffect(() => this.actions$.pipe(
    ofType(UserActions.GET_ALL),
    mergeMap(action => this.userRestService.listAll()),
    map(entities => new UserActions.GetAllSuccess(entities))
  ));
}
