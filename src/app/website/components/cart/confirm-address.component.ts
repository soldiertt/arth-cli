import {Component, OnInit} from "@angular/core";
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {AddressCompleted, AddressIncomplete} from '../../actions/cart-data.actions';
import CartData from '../../model/cart-data.class';
import * as fromCartData from '../../reducers/cart-data.reducer';
import * as fromProfile from '../../../root/reducers/user-profile.reducer';

@Component({
  selector: 'arth-confirm-address',
  templateUrl: './confirm-address.component.html'
})
export class ConfirmAddressComponent implements OnInit{

  editMode: boolean = false;
  editedItem: string;
  profileUpdated: boolean;
  profileComplete: boolean;

  constructor(private store: Store<UserProfile>,
              private cartDataStore: Store<CartData>) {}

  ngOnInit() {
    // Check if address is defined, otherwise edit it immediatly
    this.cartDataStore.select(fromCartData.selectWizardState).take(1).subscribe(wizard => {
      if (!wizard.addressCompleted) {
        this.editMode = true;
        this.editedItem = "address";
      }
    });
    this.store.select(fromProfile.selectLocalState).subscribe(profile => {
      this.profileComplete = profile.user_metadata.profileComplete;
    })
  }

  editAddress(): void {
    this.cartDataStore.dispatch(new AddressIncomplete());
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editedItem = undefined;
    if (this.profileComplete) {
      this.cartDataStore.dispatch(new AddressCompleted());
    }
  }

  updateMetaData(): void {
    this.cartDataStore.dispatch(new AddressCompleted());
    this.profileUpdated = true;
    this.editedItem = undefined;
    this.editMode = false;
  }

}
