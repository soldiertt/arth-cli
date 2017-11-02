import {Action} from '@ngrx/store';
import Brand from '../../shared/model/brand.class';

export const GET_ALL = '[Brand] GET ALL';
export const GET_ALL_SUCCESS = '[Brand] GET ALL Success';
export const CREATE = '[Brand] Create';
export const CREATE_SUCCESS = '[Brand] Create Success';
export const DELETE = '[Brand] Delete';
export const DELETE_SUCCESS = '[Brand] Delete Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: Brand[]) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public entity: Brand) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public entity: Brand) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public id: string) {}
}

export type BrandActions
  = GetAll
  | GetAllSuccess
  | Create
  | CreateSuccess
  | Delete
  | DeleteSuccess;
