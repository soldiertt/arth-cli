import {Action} from '@ngrx/store';
import Steel from '../../shared/model/steel.class';

export const GET_ALL = '[Steel] GET ALL';
export const GET_ALL_SUCCESS = '[Steel] GET ALL Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: Steel[]) {}
}

export type SteelActions
  = GetAll
  | GetAllSuccess;
