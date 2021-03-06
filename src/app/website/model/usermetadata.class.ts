import UserAddresses from './user-addresses.class';

export default class UserMetaData {
  email?: string;
  name?: string;
  addresses?: UserAddresses;
  phone?: string;
  profileComplete?: boolean;
  pendingRemoval?: boolean;
}
