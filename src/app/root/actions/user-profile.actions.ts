import {createAction, props} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import UserMetaData from '../../website/model/usermetadata.class';

export namespace ProfileActions {
  const INIT_FROM_SESSION = '[UserProfile] Init from session';
  const UPDATE_METADATA = '[UserProfile] Update metadata';
  const SET = '[UserProfile] Set';
  const UNSET = '[UserProfile] Unset';
  const LOGOUT = '[UserProfile] Logout';
  const SAVE_TO_SESSION = '[UserProfile] Save to session';
  const SAVE_TO_SESSION_SUCCESS = '[UserProfile] Save to session success';

  export const InitFromSession = createAction(
     INIT_FROM_SESSION
  );

  export const UpdateMetadata = createAction(
    UPDATE_METADATA,
    props<{userId: string, metadata: UserMetaData}>()
  );

  export const Set = createAction(
    SET,
    props<{profile: UserProfile}>()
  );

  export const Unset = createAction(
    UNSET
  );

  export const Logout = createAction(
    LOGOUT
  );

  export const SaveToSession = createAction(
    SAVE_TO_SESSION
  );

  export const SaveToSessionSuccess = createAction(
    SAVE_TO_SESSION_SUCCESS
  );

  // export type Actions
  //   = InitFromSession
  //   | UpdateMetadata
  //   | Set
  //   | Logout
  //   | SaveToSession
  //   | SaveToSessionSuccess;
}
