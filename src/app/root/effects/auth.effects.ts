import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SessionService} from '../../shared/service/session.service';
import {AuthActions} from '../actions/auth.actions';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationEffects {

  constructor(private actions$: Actions,
              private sessionService: SessionService) {}

  saveProfileInSession$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.SaveToSession),
    map((action) => this.sessionService.saveAuth(action.authResult)),
    map(() => AuthActions.SaveToSessionSuccess())
  ));

}
