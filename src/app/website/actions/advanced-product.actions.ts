import {createAction, props} from '@ngrx/store';
import AdvancedArticle from '../../shared/model/advanced-article.class';

export namespace AdvancedProductActions {
  const LOAD_ALL = '[AdvancedProduct] Load all';
  const LOAD_ALL_SUCCESS = '[AdvancedProduct] Load all success';
  const FILTER_ALL_BY_CATEGORY = '[AdvancedProduct] Filter all by category';

  export const LoadAll = createAction(
    LOAD_ALL
  );

  export const LoadAllSuccess = createAction(
    LOAD_ALL_SUCCESS,
    props<{productData: AdvancedArticle[]}>()
  );

  export const FilterAllByCategory = createAction(
    FILTER_ALL_BY_CATEGORY,
    props<{categoryName: string}>()
  );

  // export type Actions
  //   = LoadAll
  //   | LoadAllSuccess
  //   | FilterAllByCategory;
}
