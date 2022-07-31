import {createAction, props} from '@ngrx/store';
import Article from '../model/article.class';

export namespace SlideProductActions {

  const GET_ALL = '[SlideProduct] GET ALL';
  const GET_ALL_SUCCESS = '[SlideProduct] GET ALL Success';
  const CREATE = '[SlideProduct] Create';
  const CREATE_SUCCESS = '[SlideProduct] Create Success';
  const CREATE_FAIL = '[SlideProduct] Create Fail';
  const DELETE = '[SlideProduct] Delete';
  const DELETE_SUCCESS = '[SlideProduct] Delete Success';

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

  export const CreateFail = createAction(
    CREATE_FAIL,
    props<{error: string}>()
  );

  export const Delete = createAction(
    DELETE,
    props<{id: string}>()
  );

  export const DeleteSuccess = createAction(
    DELETE_SUCCESS,
    props<{id: string}>()
  );

  // export type Actions
  //   = GetAll
  //   | GetAllSuccess
  //   | Create
  //   | CreateFail
  //   | CreateSuccess
  //   | Delete
  //   | DeleteSuccess;
}
