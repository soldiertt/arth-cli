import * as actions from '../actions/brand.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Brand from '../../shared/model/brand.class';
import {createSelector} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

export const adapter = createEntityAdapter<Brand>();
export interface State extends EntityState<Brand> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState: State = adapter.getInitialState(defaultState);

export function brandReducer(state: State = initialState, action: actions.BrandActions) {

  switch (action.type) {
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    case actions.CREATE_SUCCESS:
      return adapter.addOne(action.entity, state);
    case actions.DELETE_SUCCESS:
      return adapter.removeOne(action.id, state);
    default:
      return state;
  }
}

const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.brand);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
