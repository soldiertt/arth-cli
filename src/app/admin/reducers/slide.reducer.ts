import * as actions from '../actions/slide.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import Slide from '../../shared/model/slider.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

export const adapter = createEntityAdapter<Slide>();
export interface State extends EntityState<Slide> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export function slideReducer(state: State = initialState, action: actions.SlideActions) {

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

const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.slide);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
