import {createAction, props} from '@ngrx/store';
import Brand from '../../shared/model/brand.class';

export namespace BrandActions {
  const GET_ALL = '[Brand] GET ALL';
  const GET_ALL_FROM_PRODUCT = '[Brand] GET ALL from Product';
  const GET_ALL_SUCCESS = '[Brand] GET ALL Success';
  const CREATE = '[Brand] Create';
  const CREATE_SUCCESS = '[Brand] Create Success';
  const DELETE = '[Brand] Delete';
  const DELETE_SUCCESS = '[Brand] Delete Success';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllFromProduct = createAction(
    GET_ALL_FROM_PRODUCT
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: Brand[]}>()
  );

  export const Create = createAction(
    CREATE,
    props<{entity: Brand}>()
  );

  export const CreateSuccess = createAction(
    CREATE_SUCCESS,
    props<{entity: Brand}>()
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
  //   | GetAllFromProduct
  //   | GetAllSuccess
  //   | Create
  //   | CreateSuccess
  //   | Delete
  //   | DeleteSuccess;

}

