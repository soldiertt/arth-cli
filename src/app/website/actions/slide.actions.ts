import {Action} from '@ngrx/store';
import Slide from '../../shared/model/slider.class';

export const GET_ALL = '[Slide] GET ALL';
export const GET_ALL_SUCCESS = '[Slide] GET ALL Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: Slide[]) {}
}

export type SlideActions
  = GetAll
  | GetAllSuccess;
