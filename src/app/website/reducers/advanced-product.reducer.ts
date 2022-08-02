import {createReducer, createSelector, on} from '@ngrx/store';
import AdvancedArticle from '../../shared/model/advanced-article.class';
import {AdvancedProductActions} from '../actions/advanced-product.actions';
import {siteFeatureSelector, SiteState} from '../model/site-state';

export namespace FromAdvancedProduct {

  export const initialState: AdvancedArticle[] = [];

  export const reducer = createReducer(
    initialState,
    on(AdvancedProductActions.LoadAllSuccess, (state, action) => {
      return action.productData;
    }),
  );

  export const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.advancedProductData);

}
