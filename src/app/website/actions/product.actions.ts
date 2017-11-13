import {Action} from '@ngrx/store';
import ProductItemData from '../model/product-item-data.class';
import Brand from '../../shared/model/brand.class';
import Article from '../../shared/model/article.class';
import ProductData from '../model/product-data.class';

export namespace ProductActions {
  export const LOAD_ONE = '[Product] Load One';
  export const LOAD_ONE_SUCCESS = '[Product] Load One Success';
  export const LOAD_ALL_BY_BRAND = '[Product] Load all by brand';
  export const LOAD_ALL_BY_BRAND_SUCCESS = '[Product] Load all by brand Success';
  export const LOAD_ALL_BY_CATEGORY = '[Product] Load all by category';
  export const LOAD_ALL_BY_CATEGORY_SUCCESS = '[Product] Load all by category Success';
  export const SEARCH = '[Product] Search';
  export const SEARCH_SUCCESS = '[Product] Search Success';

  export class LoadOne implements Action {
    readonly type = LOAD_ONE;

    constructor(public productId: string) {
    }
  }

  export class LoadOneSuccess implements Action {
    readonly type = LOAD_ONE_SUCCESS;

    constructor(public productItemData: ProductItemData) {
    }
  }

  export class LoadAllByBrand implements Action {
    readonly type = LOAD_ALL_BY_BRAND;

    constructor(public brand: Brand) {
    }
  }

  export class LoadAllByBrandSuccess implements Action {
    readonly type = LOAD_ALL_BY_BRAND_SUCCESS;

    constructor(public entities: Article[]) {
    }
  }

  export class LoadAllByCategory implements Action {
    readonly type = LOAD_ALL_BY_CATEGORY;

    constructor(public categoryName: string) {
    }
  }

  export class LoadAllByCategorySuccess implements Action {
    readonly type = LOAD_ALL_BY_CATEGORY_SUCCESS;

    constructor(public productData: ProductData) {
    }
  }

  export class Search implements Action {
    readonly type = SEARCH;

    constructor(public term: string) {
    }
  }

  export class SearchSuccess implements Action {
    readonly type = SEARCH_SUCCESS;

    constructor(public entities: Article[]) {
    }
  }

  export type Actions
    = LoadOne
    | LoadOneSuccess
    | LoadAllByBrand
    | LoadAllByBrandSuccess
    | LoadAllByCategory
    | LoadAllByCategorySuccess
    | Search
    | SearchSuccess;
}
