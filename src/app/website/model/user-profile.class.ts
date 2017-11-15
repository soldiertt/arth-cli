import UserMetaData from './usermetadata.class';

export default class UserProfile {
  id: string;
  user_id: string;
  last_login: string;
  logins_count: number;
  user_metadata: UserMetaData;
  app_metadata: any;
}
