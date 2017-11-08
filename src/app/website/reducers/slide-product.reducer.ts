import * as actions from '../actions/slide-product.actions';
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

export function slideProductReducer(state: State = initialState, action: actions.SlideProductActions) {

  switch (action.type) {
    case actions.GET_ALL:
      return state;
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    default:
      return state;
  }
}

const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.sliderArticles);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
