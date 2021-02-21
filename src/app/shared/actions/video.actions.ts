import {Action} from '@ngrx/store';
import Video from '../model/video.class';

export namespace VideoActions {
  export const GET_ALL = '[Video] GET ALL';
  export const GET_ALL_SUCCESS = '[Video] GET ALL Success';
  export const CREATE = '[Video] Create';
  export const CREATE_SUCCESS = '[Video] Create Success';
  export const DELETE = '[Video] Delete';
  export const DELETE_SUCCESS = '[Video] Delete Success';

  export class GetAll implements Action {
    readonly type = GET_ALL;
  }

  export class GetAllSuccess implements Action {
    readonly type = GET_ALL_SUCCESS;

    constructor(public entities: Video[]) {
    }
  }

  export class Create implements Action {
    readonly type = CREATE;
    constructor(public entity: Video) {}
  }

  export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public entity: Video) {}
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
    | CreateSuccess
    | Delete
    | DeleteSuccess;
}
