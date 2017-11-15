import {Action} from '@ngrx/store';
import Article from '../model/article.class';

export namespace SlideProductActions {

  export const GET_ALL = '[SlideProduct] GET ALL';
  export const GET_ALL_SUCCESS = '[SlideProduct] GET ALL Success';
  export const CREATE = '[SlideProduct] Create';
  export const CREATE_SUCCESS = '[SlideProduct] Create Success';
  export const CREATE_FAIL = '[SlideProduct] Create Fail';
  export const DELETE = '[SlideProduct] Delete';
  export const DELETE_SUCCESS = '[SlideProduct] Delete Success';

  export class GetAll implements Action {
    readonly type = GET_ALL;
  }

  export class GetAllSuccess implements Action {
    readonly type = GET_ALL_SUCCESS;

    constructor(public entities: Article[]) {
    }
  }

  export class Create implements Action {
    readonly type = CREATE;
    constructor(public entity: Article) {}
  }

  export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public entity: Article) {}
  }

  export class CreateFail implements Action {
    readonly type = CREATE_FAIL;
    constructor(public error: string) {}
  }

  export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) {}
  }

  export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public id: string) {}
  }

  export type Actions
    = GetAll
    | GetAllSuccess
    | Create
    | CreateFail
    | CreateSuccess
    | Delete
    | DeleteSuccess;
}
