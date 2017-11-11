import * as actions from '../actions/category.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import Category from '../../shared/model/category.class';

export const adapter = createEntityAdapter<Category>();
export interface State extends EntityState<Category> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export function categoryReducer(state: State = initialState, action: actions.CategoryActions) {

  switch (action.type) {
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    case actions.CREATE_SUCCESS:
      return adapter.addOne(action.entity, state);
    case actions.UPDATE_SUCCESS:
      return adapter.updateOne({id: action.id, changes: action.changes}, state);
    case actions.DELETE_SUCCESS:
      return adapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const getLocalState = createFeatureSelector<State>('category');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
