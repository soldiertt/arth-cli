import {Action} from '@ngrx/store';
import PaypalOrder from '../../shared/model/paypalorder.class';

export const GET_ALL = '[Order] GET ALL';
export const GET_ALL_SUCCESS = '[Order] GET ALL Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: PaypalOrder[]) {}
}

export type OrderActions
  = GetAll
  | GetAllSuccess;
