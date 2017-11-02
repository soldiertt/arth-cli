import * as actions from '../actions/category.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import Category from '../../shared/model/category.class';

export const adapter = createEntityAdapter<Category>();
export interface State extends EntityState<Category> {}

const defaultState  = {
  ids: [],
  entities: {},
  loading: false
};

export const initialState = adapter.getInitialState(defaultState);

export function categoryReducer(state: State = initialState, action: actions.CategoryActions) {

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
    case actions.UPDATE:
      return {...state, loading: true};
    case actions.UPDATE_SUCCESS:
      newState = adapter.updateOne({id: action.id, changes: action.changes}, state);
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

export const getCategoryState = createFeatureSelector<State>('category');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getCategoryState);
