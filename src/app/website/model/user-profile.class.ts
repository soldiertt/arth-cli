import {Auth0UserProfile} from 'auth0-js';
import UserMetaData from './usermetadata.class';

export default class UserProfile {
  id: string;
  user_id: string;
  user_metadata: UserMetaData;
  app_metadata: any;
  created_at: string;
  last_login?: string;
  logins_count?: number;

  constructor(auth0Profile: Auth0UserProfile) {
    this.id = auth0Profile.clientID;
    this.user_id = auth0Profile.user_id;
    this.user_metadata = auth0Profile.user_metadata;
    this.app_metadata = auth0Profile.app_metadata;
    this.created_at = auth0Profile.created_at;
    this.last_login = auth0Profile.last_login;
    this.logins_count = auth0Profile.logins_count;
  }

}
