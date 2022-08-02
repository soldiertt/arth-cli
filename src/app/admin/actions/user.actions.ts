import {createAction, props} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';

export namespace UserActions {

  const GET_ALL = '[User] GET ALL';
  const GET_ALL_SUCCESS = '[User] GET ALL Success';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: UserProfile[]}>()
  );

}
