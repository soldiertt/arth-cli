import {createAction, props} from '@ngrx/store';
import PaypalOrder from '../model/paypalorder.class';

export namespace PaypalOrderActions {
  const GET_ALL = '[Order] GET ALL';
  const GET_ALL_SUCCESS = '[Order] GET ALL Success';
  const GET_ALL_FOR_USER = '[Order] GET ALL for user';
  const GET_ALL_FOR_USER_SUCCESS = '[Order] GET ALL for user Success';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: PaypalOrder[]}>()
  );

  export const GetAllForUser = createAction(
    GET_ALL_FOR_USER,
    props<{userId: string}>()
  );

  export const GetAllForUserSuccess = createAction(
    GET_ALL_FOR_USER_SUCCESS,
    props<{entities: PaypalOrder[]}>()
  );

  // export type Actions
  //   = GetAll
  //   | GetAllSuccess
  //   | GetAllForUser
  //   | GetAllForUserSuccess;
}
