import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {GET_ALL, GetAllSuccess} from '../actions/user.actions';
import {UserRestService} from '../../shared/service/rest/user.rest.service';

@Injectable()
export class UserEffects {

  constructor(private actions: Actions, private userRestService: UserRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.userRestService.listAll())
    .map(entities => new GetAllSuccess(entities));
}
