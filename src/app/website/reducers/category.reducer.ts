import * as actions from '../actions/category.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import Category from '../../shared/model/category.class';
import {siteFeatureSelector, SiteState} from '../model/site-state';

export const adapter = createEntityAdapter<Category>();
export interface State extends EntityState<Category> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export function categoryReducer(state: State = initialState, action: actions.CategoryActions) {

  switch (action.type) {
    case actions.GET_ALL_ROOT:
      return state;
    case actions.GET_ALL_ROOT_SUCCESS:
      return adapter.addAll(action.entities, state);
    default:
      return state;
  }
}

const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.rootCategories);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
