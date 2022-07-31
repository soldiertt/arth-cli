import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {UserActions} from '../actions/user.actions';

const adapter = createEntityAdapter<UserProfile>();
const defaultState: FromAdminUser.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminUser {

  export interface State extends EntityState<UserProfile> {}

  export const reducer = createReducer(
    initialState,
    on(UserActions.GetAll, (state, action) => {
      return state;
    }),
    on(UserActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.user);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
