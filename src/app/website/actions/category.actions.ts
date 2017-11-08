import {Action} from '@ngrx/store';
import Category from '../../shared/model/category.class';

export const GET_ALL_ROOT = '[Category] GET ALL Root';
export const GET_ALL_ROOT_SUCCESS = '[Category] GET ALL Root Success';

export class GetAllRoot implements Action {
  readonly type = GET_ALL_ROOT;
}

export class GetAllRootSuccess implements Action {
  readonly type = GET_ALL_ROOT_SUCCESS;
  constructor(public entities: Category[]) {}
}

export type CategoryActions
  = GetAllRoot
  | GetAllRootSuccess;
