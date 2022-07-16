import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {map, mergeMap} from 'rxjs/operators';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {UserActions} from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(private actions: Actions, private userRestService: UserRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(UserActions.GET_ALL).pipe(
    mergeMap(action => this.userRestService.listAll()),
    map(entities => new UserActions.GetAllSuccess(entities)));
}
