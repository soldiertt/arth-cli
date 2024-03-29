
import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import CartData from '../../model/cart-data.class';
import {Subject} from 'rxjs';

import {CartDataActions} from '../../actions/cart-data.actions';
import {FromCartData} from '../../reducers/cart-data.reducer';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';

@Component({
  selector: 'arth-confirm-address',
  templateUrl: './confirm-address.component.html'
})
export class ConfirmAddressComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  editMode: boolean = false;
  editedItem: string | undefined;
  profileUpdated: boolean;

  constructor(private store: Store<UserProfile>,
              private cartDataStore: Store<CartData>) {}

  ngOnInit() {
    // Check if address is defined, otherwise edit it immediately
    this.cartDataStore.select(FromCartData.selectWizardState).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(wizard => {
        this.editMode = wizard.editMode;
        if (this.editMode) {
          this.editedItem = 'address';
        } else {
          this.editedItem = undefined;
        }
    });
    this.store.select(FromProfile.selectLocalState).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(profile => {
        if (!profile || !profile.user_metadata || !profile.user_metadata.profileComplete) {
          this.cartDataStore.dispatch(CartDataActions.SetEditMode({editMode: true}));
        }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  editAddress(): void {
    this.profileUpdated = false;
    this.cartDataStore.dispatch(CartDataActions.SetEditMode({editMode: true}));
  }

  cancelEdit(): void {
    this.cartDataStore.dispatch(CartDataActions.SetEditMode({editMode: false}));
  }

  updateMetaData(): void {
    this.cartDataStore.dispatch(CartDataActions.SetEditMode({editMode: false}));
    this.profileUpdated = true;
  }

}
