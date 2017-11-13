import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import ProductData from '../model/product-data.class';
import {ProductActions} from '../actions/product.actions';

const defaultState: ProductData = new ProductData();
defaultState.currentProducts = [];
defaultState.currentTopSales = [];

export namespace FromProduct {

  export function reducer(state: ProductData = defaultState, action: ProductActions.Actions) {

    switch (action.type) {
      case ProductActions.LOAD_ONE_SUCCESS:
        return {...state, selected: action.productItemData};

      case ProductActions.LOAD_ALL_BY_BRAND_SUCCESS:
        return {...state, currentProducts: action.entities};

      case ProductActions.SEARCH_SUCCESS:
        return {...state, currentProducts: action.entities};

      case ProductActions.LOAD_ALL_BY_CATEGORY_SUCCESS:
        return action.productData;

      default:
        return state;
    }
  }

  export const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.productData);

  export const selectSelectedState = createSelector(selectLocalState, (state: ProductData) => state.selected);
  export const selectCurrentProductsState = createSelector(selectLocalState, (state: ProductData) => state.currentProducts);

}
