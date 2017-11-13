import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Article from '../../shared/model/article.class';
import {PromoProductActions} from '../actions/promo-product.actions';

const adapter = createEntityAdapter<Article>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromPromoProduct {

  export interface State extends EntityState<Article> {}

  export function reducer(state: State = initialState, action: PromoProductActions.Actions) {

    switch (action.type) {
      case PromoProductActions.GET_ALL:
        return state;
      case PromoProductActions.GET_ALL_SUCCESS:
        return adapter.addAll(action.entities, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.promoArticles);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
