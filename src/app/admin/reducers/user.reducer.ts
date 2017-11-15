import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {UserActions} from '../actions/user.actions';

const adapter = createEntityAdapter<UserProfile>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminUser {

  export interface State extends EntityState<UserProfile> {}

  export function reducer(state: State = initialState, action: UserActions.Actions) {

    switch (action.type) {
      case UserActions.GET_ALL:
        return state;
      case UserActions.GET_ALL_SUCCESS:
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

}
