import * as actions from '../actions/product.actions';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import ProductData from '../model/product-data.class';

const defaultState: ProductData = new ProductData();
defaultState.currentProducts = [];
defaultState.currentTopSales = [];

export function productReducer(state: ProductData = defaultState, action: actions.ProductActions) {

  switch (action.type) {
    case actions.LOAD_ONE_SUCCESS:
      return {...state, selected: action.productItemData};

    default:
      return state;
  }
}

export const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.productData);

export const selectSelectedState = createSelector(selectLocalState, (state: ProductData) => state.selected);
