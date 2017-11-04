import * as actions from '../actions/slide-product.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createFeatureSelector} from '@ngrx/store';

export const adapter = createEntityAdapter<Article>();
export interface State extends EntityState<Article> {
  loading: boolean;
}

const defaultState  = {
  ids: [],
  entities: {},
  loading: false
};

export const initialState = adapter.getInitialState(defaultState);

export function slideProductReducer(state: State = initialState, action: actions.SlideProductActions) {

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
    case actions.CREATE_FAIL:
      return {...state, loading: false};
    case actions.DELETE:
      return {...state, loading: true};
    case actions.DELETE_SUCCESS:
      newState = adapter.removeOne(action.id, state);
      return {...newState, loading: false};
    default:
      return state;
  }
}

export const getSlideProductState = createFeatureSelector<State>('slideproduct');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getSlideProductState);
