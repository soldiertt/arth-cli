import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import Category from '../../shared/model/category.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {CategoryActions} from '../../shared/actions/category.actions';

const adapter = createEntityAdapter<Category>();
const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminCategory {

  export interface State extends EntityState<Category> {
  }

  export function reducer(state: State = initialState, action: CategoryActions.Actions) {

    switch (action.type) {
      case CategoryActions.GET_ALL_SUCCESS:
        return adapter.addMany(action.entities, state);
      case CategoryActions.CREATE_SUCCESS:
        return adapter.addOne(action.entity, state);
      case CategoryActions.UPDATE_SUCCESS:
        return adapter.updateOne({id: action.id, changes: action.changes}, state);
      case CategoryActions.DELETE_SUCCESS:
        return adapter.removeOne(action.id, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.category);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
