import {createFeatureSelector, createSelector} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';
import {ProfileActions} from '../actions/user-profile.actions';

const defaultState: UserProfile = new UserProfile();

export namespace FromProfile {

  export function reducer(state: UserProfile = defaultState, action: ProfileActions.Actions) {

    switch (action.type) {
      case ProfileActions.SET:
        return action.profile;

      default:
        return state;
    }
  }

  export const selectLocalState = createFeatureSelector<UserProfile>('profile');
  export const selectUserId = createSelector(selectLocalState, (state: UserProfile) => {
    if (state) {
      return state.user_id;
    }
    return undefined;
  });

}
