import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import Category from '../../shared/model/category.class';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import {CategoryActions} from '../actions/category.actions';

const adapter = createEntityAdapter<Category>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromCategory {

  export interface State extends EntityState<Category> {
  }

  export function reducer(state: State = initialState, action: CategoryActions.Actions) {

    switch (action.type) {
      case CategoryActions.GET_ALL_ROOT:
        return state;
      case CategoryActions.GET_ALL_ROOT_SUCCESS:
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

}
