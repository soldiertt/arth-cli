import Cart from './cart.class';
import UserProfile from './user-profile.class';
import Category from './category.class';
import Article from './article.class';
import Slide from './slider.class';

class CartWizard {
  addressCompleted: boolean;
  currentStep: number;
}

export default class AppData {
  cartWizard : CartWizard;
  cart: Cart;
  profile: UserProfile;
  rootCategories: Category[];
  promoArticles: Article[];
  sliderArticles: Article[];
  slides: Slide[];

  constructor() {
    this.cartWizard = new CartWizard();
    this.cart = new Cart();
    this.profile = new UserProfile();
    this.rootCategories = [];
    this.promoArticles = [];
    this.sliderArticles = [];
    this.slides = [];
  }
}
