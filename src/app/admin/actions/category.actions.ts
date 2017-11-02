import {Action} from '@ngrx/store';
import Category from '../../shared/model/category.class';

export const GET_ALL = '[Category] GET ALL';
export const GET_ALL_SUCCESS = '[Category] GET ALL Success';
export const CREATE = '[Category] Create';
export const CREATE_SUCCESS = '[Category] Create Success';
export const UPDATE = '[Category] Update';
export const UPDATE_SUCCESS = '[Category] Update Success';
export const DELETE = '[Category] Delete';
export const DELETE_SUCCESS = '[Category] Delete Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: Category[]) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public entity: Category) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public entity: Category) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public changes: Partial<Category>) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public id: string, public changes: Partial<Category>) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public id: string) {}
}

export type CategoryActions
  = GetAll
  | GetAllSuccess
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess
  | Delete
  | DeleteSuccess;
