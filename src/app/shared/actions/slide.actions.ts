import {createAction, props} from '@ngrx/store';
import Slide from '../model/slider.class';

export namespace SlideActions {
  const GET_ALL = '[Slide] GET ALL';
  const GET_ALL_SUCCESS = '[Slide] GET ALL Success';
  const CREATE = '[Slide] Create';
  const CREATE_SUCCESS = '[Slide] Create Success';
  const UPDATE = '[Slide] Update';
  const UPDATE_SUCCESS = '[Slide] Update Success';
  const DELETE = '[Slide] Delete';
  const DELETE_SUCCESS = '[Slide] Delete Success';
  const UPLOAD_NEW_PICTURE = '[Slide] Upload new picture';
  const UPLOAD_NEW_PICTURE_SUCCESS = '[Slide] Upload new picture Success';
  const UPLOAD_NEW_PICTURE_FAIL = '[Slide] Upload new picture Fail';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: Slide[]}>()
  );

  export const Create = createAction(
    CREATE,
    props<{entity: Slide}>()
  );

  export const CreateSuccess = createAction(
    CREATE_SUCCESS,
    props<{entity: Slide}>()
  );

  export const Update = createAction(
    UPDATE,
    props<{id: string, changes: Partial<Slide>}>()
  );

  export const UpdateSuccess = createAction(
    UPDATE_SUCCESS,
    props<{id: string, changes: Partial<Slide>}>()
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

}
