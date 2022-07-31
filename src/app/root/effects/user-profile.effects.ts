import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';
import {ProfileActions} from '../actions/user-profile.actions';
import AppState from '../model/app-state';
import {map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

@Injectable()
export class UserProfileEffects {

  constructor(private actions$: Actions,
              private userRestService: UserRestService,
              private sessionService: SessionService,
              private store: Store<AppState>) {}

  initProfileFromSession$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.InitFromSession),
    map(action => this.sessionService.getProfile()),
    map(profile => ProfileActions.Set({profile}))
  ));

  updateProfile$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.UpdateMetadata),
    mergeMap((action) => this.userRestService.updateProfile(action.userId, action.metadata)),
    tap(profile => this.sessionService.saveProfile(profile)),
    map(profile => ProfileActions.Set({profile}))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.Logout),
    tap(() => {
      this.sessionService.deleteAuth();
      this.sessionService.deleteProfile();
    }),
    map(profile => ProfileActions.Unset())
  ));

  saveProfileInSession$ = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.SaveToSession),
    withLatestFrom(this.store),
    map(([action, state]) => {
      this.sessionService.saveProfile(state.profile);
    }),
    map(cart => ProfileActions.SaveToSessionSuccess())
  ));

}
