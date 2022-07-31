import {createAction, props} from '@ngrx/store';
import Category from '../model/category.class';

export namespace CategoryActions {
  const GET_ALL_ROOT = '[Category] GET ALL Root';
  const GET_ALL_ROOT_SUCCESS = '[Category] GET ALL Root Success';
  const GET_ALL = '[Category] GET ALL';
  const GET_ALL_SUCCESS = '[Category] GET ALL Success';
  const CREATE = '[Category] Create';
  const CREATE_SUCCESS = '[Category] Create Success';
  const UPDATE = '[Category] Update';
  const UPDATE_SUCCESS = '[Category] Update Success';
  const DELETE = '[Category] Delete';
  const DELETE_SUCCESS = '[Category] Delete Success';

  export const GetAllRoot = createAction(
    GET_ALL_ROOT
  );

  export const GetAllRootSuccess  = createAction(
    GET_ALL_ROOT_SUCCESS,
    props<{entities: Category[]}>()
  );

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: Category[]}>()
  );

  export const Create = createAction(
    CREATE,
    props<{entity: Category}>()
  );

  export const CreateSuccess = createAction(
    CREATE_SUCCESS,
    props<{entity: Category}>()
  );

  export const Update = createAction(
    UPDATE,
    props<{id: string, changes: Partial<Category>}>()
  );

  export const UpdateSuccess = createAction(
    UPDATE_SUCCESS,
    props<{id: string, changes: Partial<Category>}>()
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
  //   = GetAllRoot
  //   | GetAllRootSuccess
  //   | GetAll
  //   | GetAllSuccess
  //   | Create
  //   | CreateSuccess
  //   | Update
  //   | UpdateSuccess
  //   | Delete
  //   | DeleteSuccess;
}
