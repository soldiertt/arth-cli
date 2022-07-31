import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Article from '../../shared/model/article.class';
import {PromoProductActions} from '../actions/promo-product.actions';

const adapter = createEntityAdapter<Article>();
const defaultState: FromPromoProduct.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromPromoProduct {

  export interface State extends EntityState<Article> {}

  export const reducer = createReducer(
    initialState,
    on(PromoProductActions.GetAll, (state, action) => {
      return state;
    }),
    on(PromoProductActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.promoArticles);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
