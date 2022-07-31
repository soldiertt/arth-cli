import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import Category from '../../shared/model/category.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {CategoryActions} from '../../shared/actions/category.actions';

const adapter = createEntityAdapter<Category>();
const defaultState: FromAdminCategory.State  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminCategory {

  export interface State extends EntityState<Category> {
  }

  export const reducer = createReducer(
    initialState,
    on(CategoryActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
    on(CategoryActions.CreateSuccess, (state, action) => {
      return adapter.addOne(action.entity, state);
    }),
    on(CategoryActions.UpdateSuccess, (state, action) => {
      return adapter.updateOne({id: action.id, changes: action.changes}, state);
    }),
    on(CategoryActions.DeleteSuccess, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.category);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
