import * as actions from '../actions/slide-product.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createSelector} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

export const adapter = createEntityAdapter<Article>();
export interface State extends EntityState<Article> {
  created: boolean;
  error?: string;
}

const defaultState  = {
  ids: [],
  entities: {},
  created: false
};

export const initialState = adapter.getInitialState(defaultState);

export function slideProductReducer(state: State = initialState, action: actions.SlideProductActions) {

  switch (action.type) {
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    case actions.CREATE:
      return {...state, created: false, error: undefined};
    case actions.CREATE_SUCCESS:
      return adapter.addOne(action.entity, state);
    case actions.CREATE_FAIL:
      return {...state, error: action.error};
    case actions.DELETE_SUCCESS:
      return adapter.removeOne(action.id, state);
    default:
      return state;
  }
}

const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.slideproduct);

export const selectCreated = createSelector(getLocalState, (state: State) => state.created);
export const selectError = createSelector(getLocalState, (state: State) => state.error);
export const selectState = createSelector(getLocalState, (state: State) => state);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
