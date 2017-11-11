import * as actions from '../actions/product.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createFeatureSelector} from '@ngrx/store';

export const adapter = createEntityAdapter<Article>();
export interface State extends EntityState<Article> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export function productReducer(state: State = initialState, action: actions.ProductActions) {

  switch (action.type) {
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    case actions.CREATE_SUCCESS:
      return adapter.addOne(action.entity, state);
    case actions.UPDATE_SUCCESS:
      return adapter.updateOne({id: action.id, changes: action.changes}, state);
    case actions.DELETE_SUCCESS:
      return adapter.removeOne(action.id, state);
    case actions.UPLOAD_NEW_PICTURE_FAIL:
      console.error(action.error);
      return state;
    default:
      return state;
  }
}

export const getLocalState = createFeatureSelector<State>('product');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
