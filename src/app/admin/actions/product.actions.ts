import {Action} from '@ngrx/store';
import Article from '../../shared/model/article.class';
import {HttpResponse} from '@angular/common/http';

export namespace ProductActions {

  export const GET_ALL = '[Product] GET ALL';
  export const GET_ALL_SUCCESS = '[Product] GET ALL Success';
  export const CREATE = '[Product] Create';
  export const CREATE_SUCCESS = '[Product] Create Success';
  export const UPDATE = '[Product] Update';
  export const UPDATE_SUCCESS = '[Product] Update Success';
  export const DELETE = '[Product] Delete';
  export const DELETE_SUCCESS = '[Product] Delete Success';
  export const UPLOAD_NEW_PICTURE = '[Product] Upload new picture';
  export const UPLOAD_NEW_PICTURE_SUCCESS = '[Product] Upload new picture Success';
  export const UPLOAD_NEW_PICTURE_FAIL = '[Product] Upload new picture Fail';
  export const EXPORT_TO_CSV = '[Product] Export to CSV';
  export const DOWNLOAD_CSV = '[Product] Download CSV';
  export const REQUEST_FAIL = '[Product] Request fail';

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

    constructor(public entity: Article) {
    }
  }

  export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public entity: Article) {
    }
  }

  export class Update implements Action {
    readonly type = UPDATE;

    constructor(public id: string, public changes: Partial<Article>) {
    }
  }

  export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public id: string, public changes: Partial<Article>) {
    }
  }

  export class Delete implements Action {
    readonly type = DELETE;

    constructor(public id: string) {
    }
  }

  export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public id: string) {
    }
  }

  export class UploadNewPicture implements Action {
    readonly type = UPLOAD_NEW_PICTURE;

    constructor(public formData: FormData) {
    }
  }

  export class UploadNewPictureSuccess implements Action {
    readonly type = UPLOAD_NEW_PICTURE_SUCCESS;
  }

  export class UploadNewPictureFail implements Action {
    readonly type = UPLOAD_NEW_PICTURE_FAIL;

    constructor(public error: string) {
    }
  }

  export class ExportToCsv implements Action {
    readonly type = EXPORT_TO_CSV;

    constructor(public category: string, public  brand: string, public steel: string, public promo: string, public instock: string) {
    }
  }

  export class DownloadCsv implements Action {
    readonly type = DOWNLOAD_CSV;

    constructor(public csvResponse: HttpResponse<Blob>) {
    }
  }

  export class RequestFail implements Action {
    readonly type = REQUEST_FAIL;

    constructor(public error: string) {
    }
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
    | UploadNewPictureFail
    | ExportToCsv
    | DownloadCsv
    | RequestFail;
}
