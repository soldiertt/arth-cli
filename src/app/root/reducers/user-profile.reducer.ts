import * as actions from '../actions/user-profile.actions';
import {createFeatureSelector} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';

const defaultState: UserProfile = new UserProfile();

export function userProfileReducer(state: UserProfile = defaultState, action: actions.UserProfileActions) {

  switch (action.type) {
    case actions.SET_PROFILE_SUCCES:
      return action.profile;

    default:
      return state;
  }
}

export const getLocalState = createFeatureSelector<UserProfile>('profile');
