import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import Category from '../../shared/model/category.class';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import {CategoryActions} from '../../shared/actions/category.actions';

const adapter = createEntityAdapter<Category>();
const defaultState: FromCategory.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromCategory {

  export interface State extends EntityState<Category> {
  }

  export const reducer = createReducer(
    initialState,
    on(CategoryActions.GetAllRoot, (state, action) => {
      return state;
    }),
    on(CategoryActions.GetAllRootSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.rootCategories);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
