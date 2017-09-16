import {Component, OnInit} from "@angular/core";
import Cart from "../../model/cart.class";
import {CartService} from "../../service/cart.service";
import {SessionService} from '../../service/session.service';
import UserProfile from '../../model/user-profile.class';
import {Actions} from '../../model/actions.class';
import {DataService} from '../../service/data.service';
import AppData from '../../model/app-data';
import {Auth0Service} from '../../service/auth.service';

@Component({
  templateUrl: 'cart-wizard.component.html'
})
export class CartWizardComponent implements OnInit {

  appData: AppData;
  cart: Cart;
  userProfile: UserProfile;

  constructor(private dataService: DataService, public authService: Auth0Service, private cartService: CartService, private sessionService: SessionService) {}

  ngOnInit() {
    this.cart = this.cartService.cart;
    this.userProfile = this.sessionService.getProfile();
    if (this.userProfile && this.userProfile.user_metadata && this.userProfile.user_metadata.addresses
      && this.userProfile.user_metadata.addresses.delivery && this.userProfile.user_metadata.profileComplete) {
      this.dataService.doAction(Actions.ADDRESS_COMPLETED);
    } else {
      this.dataService.doAction(Actions.ADDRESS_INCOMPLETE);
    }
    if (this.cart.totalCount > 0) {
      if (this.authService.authenticated()) {
        this.dataService.doAction(Actions.CART_MOVE_TO_STEP, 2);
      } else {
        this.dataService.doAction(Actions.CART_MOVE_TO_STEP, 1);
      }
    } else {
      this.dataService.doAction(Actions.CART_MOVE_TO_STEP, 0);
    }
    this.dataService.appData.subscribe(appData => this.appData = appData);
  }

  isOnStep(step: number): boolean {
    return this.appData.cartData.currentStep === step;
  }

  isAtLeast(step: number): boolean {
    return this.appData.cartData.currentStep >= step;
  }

}
