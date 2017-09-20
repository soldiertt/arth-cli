import Cart from './cart.class';
import UserProfile from './user-profile.class';

class CartWizard {
  addressCompleted: boolean;
  currentStep: number;
}

export default class AppData {
  cartWizard : CartWizard;
  cart: Cart;
  profile: UserProfile;

  constructor() {
    this.cartWizard = new CartWizard();
    this.cart = new Cart();
    this.profile = new UserProfile();
  }
}
