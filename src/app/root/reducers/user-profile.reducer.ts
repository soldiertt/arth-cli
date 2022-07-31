import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import {ProfileActions} from '../actions/user-profile.actions';

const defaultState: UserProfile = {
  id: '',
  user_id: '',
  user_metadata: {},
  app_metadata: '',
  created_at: ''
};

export namespace FromProfile {

  export const reducer = createReducer(
    defaultState,
    on(ProfileActions.Set, (state, action) => {
      return action.profile;
    }),
    on(ProfileActions.Unset, (state, action) => {
      return defaultState;
    }),
  );

  export const selectLocalState = createFeatureSelector<UserProfile>('profile');
  export const selectUserId = createSelector(selectLocalState, (state: UserProfile) => {
    if (state) {
      return state.user_id;
    }
    return undefined;
  });

}
