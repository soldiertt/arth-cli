import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {UserActions} from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(private actions: Actions, private userRestService: UserRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(UserActions.GET_ALL)
    .mergeMap(action => this.userRestService.listAll())
    .map(entities => new UserActions.GetAllSuccess(entities));
}
