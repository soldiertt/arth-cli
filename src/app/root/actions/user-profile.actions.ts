import {Action} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import UserMetaData from '../../website/model/usermetadata.class';

export const SET_PROFILE = '[UserProfile] Set Profile';
export const SET_PROFILE_SUCCES = '[UserProfile] Set Profile Success';
export const LOGOUT = '[UserProfile] Logout';

export class SetProfile implements Action {
  readonly type = SET_PROFILE;
  constructor(public userId: string, public metadata: UserMetaData) {}
}

export class SetProfileSuccess implements Action {
  readonly type = SET_PROFILE_SUCCES;
  constructor(public profile: UserProfile) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type UserProfileActions
  = SetProfile
  | SetProfileSuccess
  | Logout;
