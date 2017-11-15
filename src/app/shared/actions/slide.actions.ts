import {Action} from '@ngrx/store';
import Slide from '../model/slider.class';

export namespace SlideActions {
  export const GET_ALL = '[Slide] GET ALL';
  export const GET_ALL_SUCCESS = '[Slide] GET ALL Success';
  export const CREATE = '[Slide] Create';
  export const CREATE_SUCCESS = '[Slide] Create Success';
  export const UPDATE = '[Slide] Update';
  export const UPDATE_SUCCESS = '[Slide] Update Success';
  export const DELETE = '[Slide] Delete';
  export const DELETE_SUCCESS = '[Slide] Delete Success';
  export const UPLOAD_NEW_PICTURE = '[Slide] Upload new picture';
  export const UPLOAD_NEW_PICTURE_SUCCESS = '[Slide] Upload new picture Success';
  export const UPLOAD_NEW_PICTURE_FAIL = '[Slide] Upload new picture Fail';

  export class GetAll implements Action {
    readonly type = GET_ALL;
  }

  export class GetAllSuccess implements Action {
    readonly type = GET_ALL_SUCCESS;

    constructor(public entities: Slide[]) {
    }
  }

  export class Create implements Action {
    readonly type = CREATE;
    constructor(public entity: Slide) {}
  }

  export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public entity: Slide) {}
  }

  export class Update implements Action {
    readonly type = UPDATE;
    constructor(public id: string, public changes: Partial<Slide>) {}
  }

  export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public id: string, public changes: Partial<Slide>) {}
  }

  export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) {}
  }

  export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public id: string) {}
  }

  export class UploadNewPicture implements Action {
    readonly type = UPLOAD_NEW_PICTURE;
    constructor(public formData: FormData) {}
  }

  export class UploadNewPictureSuccess implements Action {
    readonly type = UPLOAD_NEW_PICTURE_SUCCESS;
  }

  export class UploadNewPictureFail implements Action {
    readonly type = UPLOAD_NEW_PICTURE_FAIL;
    constructor(public error: string) {}
  }

  export type Actions
    = GetAll
    | GetAllSuccess
    | Create
    | CreateSuccess
    | Update
    | UpdateSuccess
    | Delete
    | DeleteSuccess
    | UploadNewPicture
    | UploadNewPictureSuccess
    | UploadNewPictureFail;
}
