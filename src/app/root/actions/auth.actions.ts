import {createAction, props} from '@ngrx/store';

export namespace AuthActions {
  const SAVE_TO_SESSION = '[Authentication] Save to session';
  const SAVE_TO_SESSION_SUCCESS = '[Authentication] Save to session success';

  export const SaveToSession = createAction(
    SAVE_TO_SESSION,
    props<{authResult: any}>()
  );

  export const SaveToSessionSuccess = createAction(
    SAVE_TO_SESSION_SUCCESS
  );

  // export type Actions
  //   = SaveToSession
  //   | SaveToSessionSuccess;
}
