import {Action} from '@ngrx/store';
import PaypalOrder from '../../shared/model/paypalorder.class';

export namespace PaypalOrderActions {
  export const GET_ALL_FOR_USER = '[Order] GET ALL for user';
  export const GET_ALL_FOR_USER_SUCCESS = '[Order] GET ALL for user Success';

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
    = GetAllForUser
    | GetAllForUserSuccess;
}
