import {Action} from '@ngrx/store';
import Article from '../../shared/model/article.class';

export namespace SlideProductActions {
  export const GET_ALL = '[Slide product] GET ALL';
  export const GET_ALL_SUCCESS = '[Slide product] GET ALL Success';

  export class GetAll implements Action {
    readonly type = GET_ALL;
  }

  export class GetAllSuccess implements Action {
    readonly type = GET_ALL_SUCCESS;

    constructor(public entities: Article[]) {
    }
  }

  export type Actions
    = GetAll
    | GetAllSuccess;
}
