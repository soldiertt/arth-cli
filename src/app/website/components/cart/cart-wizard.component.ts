import {Component, OnInit} from "@angular/core";
import {Actions} from '../../model/actions.class';
import {DataService} from '../../service/data.service';
import AppData from '../../model/app-data';
import {Auth0Service} from '../../../shared/service/auth.service';

@Component({
  templateUrl: 'cart-wizard.component.html'
})
export class CartWizardComponent implements OnInit {

  appData: AppData;

  constructor(private dataService: DataService, public authService: Auth0Service) {}

  ngOnInit() {
    const appDataSnapshot = this.dataService.appData.getValue();

    if (appDataSnapshot.profile && appDataSnapshot.profile.user_metadata && appDataSnapshot.profile.user_metadata.addresses
      && appDataSnapshot.profile.user_metadata.addresses.delivery && appDataSnapshot.profile.user_metadata.profileComplete) {
      this.dataService.doAction(Actions.ADDRESS_COMPLETED);
    } else {
      this.dataService.doAction(Actions.ADDRESS_INCOMPLETE);
    }
    if (appDataSnapshot.cart.totalCount > 0) {
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
    return this.appData.cartWizard.currentStep === step;
  }

  isAtLeast(step: number): boolean {
    return this.appData.cartWizard.currentStep >= step;
  }

}
