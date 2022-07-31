import {createAction, props} from '@ngrx/store';
import Video from '../model/video.class';

export namespace VideoActions {
  const GET_ALL = '[Video] GET ALL';
  const GET_ALL_SUCCESS = '[Video] GET ALL Success';
  const CREATE = '[Video] Create';
  const CREATE_SUCCESS = '[Video] Create Success';
  const DELETE = '[Video] Delete';
  const DELETE_SUCCESS = '[Video] Delete Success';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: Video[]}>()
  );

  export const Create = createAction(
    CREATE,
    props<{entity: Video}>()
  );

  export const CreateSuccess = createAction(
    CREATE_SUCCESS,
    props<{entity: Video}>()
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
  //   | CreateSuccess
  //   | Delete
  //   | DeleteSuccess;
}
