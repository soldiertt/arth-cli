import * as actions from '../actions/slide-product.actions';
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

export function slideProductReducer(state: State = initialState, action: actions.SlideProductActions) {

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

export const getLocalState = createFeatureSelector<State>('slideproduct');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
