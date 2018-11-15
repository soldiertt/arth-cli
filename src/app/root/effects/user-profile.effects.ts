import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';
import {ProfileActions} from '../actions/user-profile.actions';
import AppState from '../model/app-state';
import {map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

@Injectable()
export class UserProfileEffects {

  constructor(private actions: Actions,
              private userRestService: UserRestService,
              private sessionService: SessionService,
              private store: Store<AppState>) {}

  @Effect()
  initProfileFromSession: Observable<Action> = this.actions.ofType(ProfileActions.INIT_FROM_SESSION)
    .pipe(
      map(action => this.sessionService.getProfile()),
      map(profile => new ProfileActions.Set(profile))
    );

  @Effect()
  updateProfile: Observable<Action> = this.actions.ofType(ProfileActions.UPDATE_METADATA)
    .pipe(
      mergeMap((action: ProfileActions.UpdateMetadata) => this.userRestService.updateProfile(action.userId, action.metadata)),
      tap(profile => this.sessionService.saveProfile(profile)),
      map(profile => new ProfileActions.Set(profile))
    );

  @Effect()
  logout: Observable<Action> = this.actions.ofType(ProfileActions.LOGOUT)
    .pipe(
      tap(() => {
        this.sessionService.deleteAuth();
        this.sessionService.deleteProfile();
      }),
      map(profile => new ProfileActions.Set(undefined))
    );

  @Effect()
  saveProfileInSession: Observable<Action> = this.actions.ofType(ProfileActions.SAVE_TO_SESSION)
    .pipe(
      withLatestFrom(this.store),
      map(([action, state]) => {
        this.sessionService.saveProfile(state.profile);
      }),
      map(cart => new ProfileActions.SaveToSessionSuccess())
    );

}
