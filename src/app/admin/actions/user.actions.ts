import {Action} from '@ngrx/store';
import UserProfile from '../../website/model/user-profile.class';

export const GET_ALL = '[User] GET ALL';
export const GET_ALL_SUCCESS = '[User] GET ALL Success';

export class GetAll implements Action {
  readonly type = GET_ALL;
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public entities: UserProfile[]) {}
}

export type UserActions
  = GetAll
  | GetAllSuccess;
