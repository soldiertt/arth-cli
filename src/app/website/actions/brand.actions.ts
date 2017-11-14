import {Action} from '@ngrx/store';
import Brand from '../../shared/model/brand.class';

export namespace BrandActions {
  export const GET_ALL = '[Brand] GET ALL';
  export const GET_ALL_SUCCESS = '[Brand] GET ALL Success';

  export class GetAll implements Action {
    readonly type = GET_ALL;
  }

  export class GetAllSuccess implements Action {
    readonly type = GET_ALL_SUCCESS;

    constructor(public entities: Brand[]) {
    }
  }

  export type Actions
    = GetAll
    | GetAllSuccess;

}

