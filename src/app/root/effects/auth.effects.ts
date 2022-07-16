import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {SessionService} from '../../shared/service/session.service';
import {AuthActions} from '../actions/auth.actions';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationEffects {

  constructor(private actions$: Actions,
              private sessionService: SessionService) {}

  saveProfileInSession$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.SAVE_TO_SESSION),
    map((action: AuthActions.SaveToSession) => this.sessionService.saveAuth(action.authResult)),
    map(() => new AuthActions.SaveToSessionSuccess())
  ));

}
