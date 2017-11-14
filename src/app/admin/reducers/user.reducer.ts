import * as actions from '../actions/user.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

export const adapter = createEntityAdapter<UserProfile>();
export interface State extends EntityState<UserProfile> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState: State = adapter.getInitialState(defaultState);

export function userReducer(state: State = initialState, action: actions.UserActions) {

  switch (action.type) {
    case actions.GET_ALL:
      return state;
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    default:
      return state;
  }
}

const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.user);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
