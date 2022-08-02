import {createAction, props} from '@ngrx/store';
import Article from '../../shared/model/article.class';

export namespace PromoProductActions {
  const GET_ALL = '[Promo product] GET ALL';
  const GET_ALL_SUCCESS = '[Promo product] GET ALL Success';

  export const GetAll = createAction(
    GET_ALL
  );

  export const GetAllSuccess = createAction(
    GET_ALL_SUCCESS,
    props<{entities: Article[]}>()
  );

}
