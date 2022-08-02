import {createAction, props} from '@ngrx/store';
import AdvancedArticle from '../../shared/model/advanced-article.class';

export namespace AdvancedProductActions {

  const GET_ALL = '[AdvancedProduct] GET ALL';
  const GET_ALL_SUCCESS = '[AdvancedProduct] GET ALL Success';
  const CREATE = '[AdvancedProduct] Create';
  const CREATE_SUCCESS = '[AdvancedProduct] Create Success';
  const UPDATE = '[AdvancedProduct] Update';
  const UPDATE_SUCCESS = '[AdvancedProduct] Update Success';
  const DELETE = '[AdvancedProduct] Delete';
  const DELETE_SUCCESS = '[AdvancedProduct] Delete Success';
  const UPLOAD_NEW_PICTURE = '[AdvancedProduct] Upload new picture';
  const UPLOAD_NEW_PICTURE_SUCCESS = '[AdvancedProduct] Upload new picture Success';
  const UPLOAD_NEW_PICTURE_FAIL = '[AdvancedProduct] Upload new picture Fail';
  const REQUEST_FAIL = '[AdvancedProduct] Request fail';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: AdvancedArticle[]}>()
  );

  export const Create = createAction(
    CREATE,
    props<{entity: AdvancedArticle}>()
  );

  export const CreateSuccess = createAction(
    CREATE_SUCCESS,
    props<{entity: AdvancedArticle}>()
  );

  export const Update = createAction(
    UPDATE,
    props<{id: string, changes: Partial<AdvancedArticle>}>()
  );

  export const UpdateSuccess = createAction(
    UPDATE_SUCCESS,
    props<{id: string, changes: Partial<AdvancedArticle>}>()
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

  export const RequestFail = createAction(
    REQUEST_FAIL,
    props<{error: string}>()
  );

}
