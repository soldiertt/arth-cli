import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';
import {AuthActions} from '../actions/auth.actions';
import {ProfileActions} from '../actions/user-profile.actions';
import AppState from '../model/app-state';
import {map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

@Injectable()
export class AuthenticationEffects {

  constructor(private actions: Actions,
              private sessionService: SessionService) {}

  @Effect()
  saveProfileInSession: Observable<Action> = this.actions.ofType(AuthActions.SAVE_TO_SESSION)
    .pipe(
      map((action: AuthActions.SaveToSession) => this.sessionService.saveAuth(action.authResult)),
      map(() => new AuthActions.SaveToSessionSuccess())
    );

}
