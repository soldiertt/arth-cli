import * as actions from '../actions/steel.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import Steel from '../../shared/model/steel.class';

export const adapter = createEntityAdapter<Steel>();
export interface State extends EntityState<Steel> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState: State = adapter.getInitialState(defaultState);

export function steelReducer(state: State = initialState, action: actions.SteelActions) {

  switch (action.type) {
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    default:
      return state;
  }
}

export const getLocalState = createFeatureSelector<State>('steel');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
