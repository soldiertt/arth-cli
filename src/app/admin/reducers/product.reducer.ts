import * as actions from '../actions/product.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createFeatureSelector} from '@ngrx/store';

export const adapter = createEntityAdapter<Article>();
export interface State extends EntityState<Article> {}

const defaultState  = {
  ids: [],
  entities: {},
  loading: false,
  edited: Article
};

export const initialState = adapter.getInitialState(defaultState);

export function productReducer(state: State = initialState, action: actions.ProductActions) {

  let newState;

  switch (action.type) {
    case actions.GET_ALL:
      return {...state, loading: true};
    case actions.GET_ALL_SUCCESS:
      newState = adapter.addAll(action.entities, state);
      return {...newState, loading: false};
    case actions.CREATE:
      return {...state, loading: true};
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

export const getProductState = createFeatureSelector<State>('product');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getProductState);
