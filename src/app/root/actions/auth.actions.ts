import {Action} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import UserMetaData from '../../website/model/usermetadata.class';

export namespace AuthActions {
  export const SAVE_TO_SESSION = '[Authentication] Save to session';
  export const SAVE_TO_SESSION_SUCCESS = '[Authentication] Save to session success';

  export class SaveToSession implements Action {
    readonly type = SAVE_TO_SESSION;
    constructor(public authResult: any) {}
  }

  export class SaveToSessionSuccess implements Action {
    readonly type = SAVE_TO_SESSION_SUCCESS;
  }

  export type Actions
    = SaveToSession
    | SaveToSessionSuccess;
}
