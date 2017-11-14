import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import {ProfileActions} from '../actions/user-profile.actions';
import UserProfile from '../../website/model/user-profile.class';
import AppState from '../model/app-state';

@Injectable()
export class UserProfileEffects {

  constructor(private actions: Actions,
              private userRestService: UserRestService,
              private sessionService: SessionService,
              private store: Store<AppState>) {}

  @Effect()
  initProfileFromSession: Observable<Action> = this.actions.ofType(ProfileActions.INIT_FROM_SESSION)
    .map(action => this.sessionService.getProfile())
    .map(profile => new ProfileActions.Set(profile));

  @Effect()
  updateProfile: Observable<Action> = this.actions.ofType(ProfileActions.UPDATE_METADATA)
    .mergeMap((action: ProfileActions.UpdateMetadata) => this.userRestService.updateProfile(action.userId, action.metadata))
    .do(profile => this.sessionService.saveProfile(profile))
    .map(profile => new ProfileActions.Set(profile));

  @Effect()
  logout: Observable<Action> = this.actions.ofType(ProfileActions.LOGOUT)
    .do(() => {
      this.sessionService.deleteIdToken();
      this.sessionService.deleteProfile();
    })
    .map(profile => new ProfileActions.Set(undefined));

  @Effect()
  saveProfileInSession: Observable<Action> = this.actions.ofType(ProfileActions.SAVE_TO_SESSION)
    .withLatestFrom(this.store)
    .map(([action, state]) => {
    console.log(action, state);
    this.sessionService.saveProfile(state.profile);
    })
    .map(cart => new ProfileActions.SaveToSessionSuccess());

}
