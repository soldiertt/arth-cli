import {Action} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import UserMetaData from '../../website/model/usermetadata.class';

export namespace ProfileActions {
  export const INIT_FROM_SESSION = '[UserProfile] Init from session';
  export const UPDATE_METADATA = '[UserProfile] Update metadata';
  export const SET = '[UserProfile] Set';
  export const LOGOUT = '[UserProfile] Logout';
  export const SAVE_TO_SESSION = '[UserProfile] Save to session';
  export const SAVE_TO_SESSION_SUCCESS = '[UserProfile] Save to session success';

  export class InitFromSession implements Action {
    readonly type = INIT_FROM_SESSION;
  }

  export class UpdateMetadata implements Action {
    readonly type = UPDATE_METADATA;

    constructor(public userId: string, public metadata: UserMetaData) {}
  }

  export class Set implements Action {
    readonly type = SET;

    constructor(public profile: UserProfile) {}
  }

  export class Logout implements Action {
    readonly type = LOGOUT;
  }

  export class SaveToSession implements Action {
    readonly type = SAVE_TO_SESSION;
  }

  export class SaveToSessionSuccess implements Action {
    readonly type = SAVE_TO_SESSION_SUCCESS;
  }

  export type Actions
    = InitFromSession
    | UpdateMetadata
    | Set
    | Logout
    | SaveToSession
    | SaveToSessionSuccess;
}
