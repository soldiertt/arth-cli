import {Action} from '@ngrx/store';
import Article from '../../shared/model/article.class';

export const GET_ALL = '[Product] GET ALL';
export const GET_ALL_SUCCESS = '[Product] GET ALL Success';
export const CREATE = '[Product] Create';
export const CREATE_SUCCESS = '[Product] Create Success';
export const UPDATE = '[Product] Update';
export const UPDATE_SUCCESS = '[Product] Update Success';
export const DELETE = '[Product] Delete';
export const DELETE_SUCCESS = '[Product] Delete Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: Article[]) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public entity: Article) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public entity: Article) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public changes: Partial<Article>) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public id: string, public changes: Partial<Article>) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public id: string) {}
}

export type ProductActions
  = GetAll
  | GetAllSuccess
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess
  | Delete
  | DeleteSuccess;
