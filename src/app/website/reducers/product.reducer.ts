import {createReducer, createSelector, on} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import ProductData from '../model/product-data.class';
import {ProductActions} from '../actions/product.actions';

const defaultState: ProductData = new ProductData();
defaultState.currentProducts = [];
defaultState.currentTopSales = [];

export namespace FromProduct {

  export const reducer = createReducer(
    defaultState,
    on(ProductActions.LoadOneSuccess, (state, action) => {
      return {...state, selectedArticle: action.productItemData};
    }),
    on(ProductActions.LoadOneFailure, (state) => {
      return {...state, selectedArticle: undefined};
    }),
    on(ProductActions.LoadAllByBrandSuccess, (state, action) => {
      return {...state, currentProducts: action.entities};
    }),
    on(ProductActions.SearchSuccess, (state, action) => {
      return {...state, currentProducts: action.entities};
    }),
    on(ProductActions.LoadAllByCategorySuccess, (state, action) => {
      return {
        ...state,
        selected: action.productData.selected,
        subCategories: action.productData.subCategories,
        currentProducts: action.productData.currentProducts,
        currentTopSales: action.productData.currentTopSales
      };
    }),
    on(ProductActions.LoadAllByCategoryFailure, (state) => {
      return {...state, selected: undefined, subCategories: [], currentProducts: [], currentTopSales: []};
    }),
  );

  export const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.productData);

  export const selectSelectedState = createSelector(selectLocalState, (state: ProductData) => state.selected);
  export const selectSelectedArticleState = createSelector(selectLocalState, (state: ProductData) => state.selectedArticle);
  export const selectCurrentProductsState = createSelector(selectLocalState, (state: ProductData) => state.currentProducts);

}
