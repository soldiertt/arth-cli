import {createAction, props} from '@ngrx/store';
import AdvancedArticle from '../../shared/model/advanced-article.class';

export namespace AdvancedProductActions {
  const LOAD_ALL = '[AdvancedProduct] Load all';
  const LOAD_ALL_SUCCESS = '[AdvancedProduct] Load all success';

  export const LoadAll = createAction(
    LOAD_ALL
  );

  export const LoadAllSuccess = createAction(
    LOAD_ALL_SUCCESS,
    props<{productData: AdvancedArticle[]}>()
  );

}
