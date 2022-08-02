import {createAction, props} from '@ngrx/store';
import ProductItemData from '../model/product-item-data.class';
import Brand from '../../shared/model/brand.class';
import Article from '../../shared/model/article.class';
import ProductData from '../model/product-data.class';

export namespace ProductActions {
  const LOAD_ONE = '[Product] Load One';
  const LOAD_ONE_SUCCESS = '[Product] Load One Success';
  const LOAD_ALL_BY_BRAND = '[Product] Load all by brand';
  const LOAD_ALL_BY_BRAND_SUCCESS = '[Product] Load all by brand Success';
  const LOAD_ALL_BY_CATEGORY = '[Product] Load all by category';
  const LOAD_ALL_BY_CATEGORY_SUCCESS = '[Product] Load all by category Success';
  const SEARCH = '[Product] Search';
  const SEARCH_SUCCESS = '[Product] Search Success';

  export const LoadOne = createAction(
    LOAD_ONE,
    props<{productId: string}>()
  );

  export const LoadOneSuccess = createAction(
    LOAD_ONE_SUCCESS,
    props<{productItemData: ProductItemData}>()
  );

  export const LoadAllByBrand = createAction(
    LOAD_ALL_BY_BRAND,
    props<{brand: Brand}>()
  );

  export const LoadAllByBrandSuccess = createAction(
    LOAD_ALL_BY_BRAND_SUCCESS,
    props<{entities: Article[]}>()
  );

  export const LoadAllByCategory = createAction(
    LOAD_ALL_BY_CATEGORY,
    props<{categoryName: string}>()
  );

  export const LoadAllByCategorySuccess = createAction(
    LOAD_ALL_BY_CATEGORY_SUCCESS,
    props<{productData: ProductData}>()
  );

  export const Search = createAction(
    SEARCH,
    props<{term: string}>()
  );

  export const SearchSuccess = createAction(
    SEARCH_SUCCESS,
    props<{entities: Article[]}>()
  );

}
