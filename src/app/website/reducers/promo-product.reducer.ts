import * as actions from '../actions/promo-product.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Article from '../../shared/model/article.class';

export const adapter = createEntityAdapter<Article>();
export interface State extends EntityState<Article> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export function promoProductReducer(state: State = initialState, action: actions.PromoProductActions) {

  switch (action.type) {
    case actions.GET_ALL:
      return state;
    case actions.GET_ALL_SUCCESS:
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
