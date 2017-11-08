import * as actions from '../actions/brand.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Brand from '../../shared/model/brand.class';
import {createSelector} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

export const adapter = createEntityAdapter<Brand>();
export interface State extends EntityState<Brand> {}

const defaultState  = {
  ids: [],
  entities: {},
  loading: false
};

export const initialState: State = adapter.getInitialState(defaultState);

export function brandReducer(state: State = initialState, action: actions.BrandActions) {

  let newState;

  switch (action.type) {
    case actions.GET_ALL:
      return {...state, loading: true};
    case actions.GET_ALL_SUCCESS:
      newState = adapter.addAll(action.entities, state);
      return {...newState, loading: false};
    case actions.CREATE:
      return { ...state, loading: true};
    case actions.CREATE_SUCCESS:
      newState = adapter.addOne(action.entity, state);
      return {...newState, loading: false};
    case actions.DELETE:
      return {...state, loading: true};
    case actions.DELETE_SUCCESS:
      newState = adapter.removeOne(action.id, state);
      return {...newState, loading: false};
    default:
      return state;
  }
}

const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.brand);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
