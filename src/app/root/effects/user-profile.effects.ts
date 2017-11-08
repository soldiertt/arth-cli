import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
  LOGOUT,
  SET_PROFILE, SetProfile, SetProfileSuccess
} from '../actions/user-profile.actions';
import {UserRestService} from '../../shared/service/rest/user.rest.service';
import {SessionService} from '../../shared/service/session.service';
import 'rxjs/add/operator/do';

@Injectable()
export class UserProfileEffects {

  constructor(private actions: Actions,
              private userRestService: UserRestService,
              private sessionService: SessionService) {}

  @Effect()
  setProfile: Observable<Action> = this.actions.ofType(SET_PROFILE)
    .mergeMap((action: SetProfile) => this.userRestService.updateProfile(action.userId, action.metadata))
    .do(profile => this.sessionService.saveProfile(profile))
    .map(profile => new SetProfileSuccess(profile));

  @Effect()
  logout: Observable<Action> = this.actions.ofType(LOGOUT)
    .do(() => {
      this.sessionService.deleteIdToken();
      this.sessionService.deleteProfile();
    })
    .map(profile => new SetProfileSuccess(undefined));
}
