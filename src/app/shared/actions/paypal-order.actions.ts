import {Action} from '@ngrx/store';
import PaypalOrder from '../model/paypalorder.class';

export namespace PaypalOrderActions {
  export const GET_ALL = '[Order] GET ALL';
  export const GET_ALL_SUCCESS = '[Order] GET ALL Success';
  export const GET_ALL_FOR_USER = '[Order] GET ALL for user';
  export const GET_ALL_FOR_USER_SUCCESS = '[Order] GET ALL for user Success';

  export class GetAll implements Action {
    readonly type = GET_ALL;
  }

  export class GetAllSuccess implements Action {
    readonly type = GET_ALL_SUCCESS;
    constructor(public entities: PaypalOrder[]) {}
  }

  export class GetAllForUser implements Action {
    readonly type = GET_ALL_FOR_USER;
    constructor(public userId: string) {
    }
  }

  export class GetAllForUserSuccess implements Action {
    readonly type = GET_ALL_FOR_USER_SUCCESS;
    constructor(public entities: PaypalOrder[]) {
    }
  }

  export type Actions
    = GetAll
    | GetAllSuccess
    | GetAllForUser
    | GetAllForUserSuccess;
}
