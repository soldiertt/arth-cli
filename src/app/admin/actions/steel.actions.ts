import {createAction, props} from '@ngrx/store';
import Steel from '../../shared/model/steel.class';

export namespace SteelActions {

  const GET_ALL = '[Steel] GET ALL';
  const GET_ALL_SUCCESS = '[Steel] GET ALL Success';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: Steel[]}>()
  );

}
