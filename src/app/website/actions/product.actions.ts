import {Action} from '@ngrx/store';
import ProductItemData from '../model/product-item-data.class';

export const LOAD_ONE = '[Product] Load';
export const LOAD_ONE_SUCCESS = '[Product] Load Success';

export class LoadOne implements Action {
  readonly type = LOAD_ONE;
  constructor(public productId: string) {}
}

export class LoadOneSuccess implements Action {
  readonly type = LOAD_ONE_SUCCESS;
  constructor(public productItemData: ProductItemData) {}
}

export type ProductActions
  = LoadOne
  | LoadOneSuccess;
