import {Action} from '@ngrx/store';
import Article from '../../shared/model/article.class';

export const GET_ALL = '[Promo product] GET ALL';
export const GET_ALL_SUCCESS = '[Promo product] GET ALL Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: Article[]) {}
}

export type PromoProductActions
  = GetAll
  | GetAllSuccess;
