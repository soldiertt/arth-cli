import * as actions from '../actions/slide.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import Slide from '../../shared/model/slider.class';

export const adapter = createEntityAdapter<Slide>();
export interface State extends EntityState<Slide> {}

const defaultState  = {
  ids: [],
  entities: {},
  loading: false,
  edited: Slide
};

export const initialState = adapter.getInitialState(defaultState);

export function slideReducer(state: State = initialState, action: actions.SlideActions) {

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

export const getSlideState = createFeatureSelector<State>('slide');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getSlideState);
