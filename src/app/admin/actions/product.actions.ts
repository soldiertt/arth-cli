import {createAction, props} from '@ngrx/store';
import Article from '../../shared/model/article.class';
import {HttpResponse} from '@angular/common/http';

export namespace ProductActions {

  const GET_ALL = '[Product] GET ALL';
  const GET_ALL_SUCCESS = '[Product] GET ALL Success';
  const CREATE = '[Product] Create';
  const CREATE_SUCCESS = '[Product] Create Success';
  const UPDATE = '[Product] Update';
  const UPDATE_SUCCESS = '[Product] Update Success';
  const DELETE = '[Product] Delete';
  const DELETE_SUCCESS = '[Product] Delete Success';
  const UPLOAD_NEW_PICTURE = '[Product] Upload new picture';
  const UPLOAD_NEW_PICTURE_SUCCESS = '[Product] Upload new picture Success';
  const UPLOAD_NEW_PICTURE_FAIL = '[Product] Upload new picture Fail';
  const EXPORT_TO_CSV = '[Product] Export to CSV';
  const DOWNLOAD_CSV = '[Product] Download CSV';
  const REQUEST_FAIL = '[Product] Request fail';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: Article[]}>()
  );

  export const Create = createAction(
    CREATE,
    props<{entity: Article}>()
  );

  export const CreateSuccess = createAction(
    CREATE_SUCCESS,
    props<{entity: Article}>()
  );

  export const Update = createAction(
    UPDATE,
    props<{id: string, changes: Partial<Article>}>()
  );

  export const UpdateSuccess = createAction(
    UPDATE_SUCCESS,
    props<{id: string, changes: Partial<Article>}>()
  );

  export const Delete = createAction(
    DELETE,
    props<{id: string}>()
  );

  export const DeleteSuccess = createAction(
    DELETE_SUCCESS,
    props<{id: string}>()
  );

  export const UploadNewPicture = createAction(
    UPLOAD_NEW_PICTURE,
    props<{formData: FormData}>()
  );

  export const UploadNewPictureSuccess = createAction(
    UPLOAD_NEW_PICTURE_SUCCESS
  );

  export const UploadNewPictureFail = createAction(
    UPLOAD_NEW_PICTURE_FAIL,
    props<{error: string}>()
  );

  export const ExportToCsv = createAction(
    EXPORT_TO_CSV,
    props<{category?: string, brand?: string, steel?: string, promo?: string, instock?: string}>()
  );

  export const DownloadCsv = createAction(
    DOWNLOAD_CSV,
    props<{csvResponse: HttpResponse<Blob>}>()
  );

  export const RequestFail = createAction(
    REQUEST_FAIL,
    props<{error: string}>()
  );

  // export type Actions
  //   = GetAll
  //   | GetAllSuccess
  //   | Create
  //   | CreateSuccess
  //   | Update
  //   | UpdateSuccess
  //   | Delete
  //   | DeleteSuccess
  //   | UploadNewPicture
  //   | UploadNewPictureSuccess
  //   | UploadNewPictureFail
  //   | ExportToCsv
  //   | DownloadCsv
  //   | RequestFail;
}
