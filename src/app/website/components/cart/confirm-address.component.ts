import {Component, OnInit} from "@angular/core";
import {DataService} from '../../service/data.service';
import {Actions} from '../../model/actions.class';
import AppData from '../../model/app-data';
import UserProfile from '../../model/user-profile.class';
import {Store} from '@ngrx/store';
import {SetProfile} from '../../../root/actions/user-profile.actions';
import {AddressCompleted} from '../../actions/cart-data.actions';

@Component({
  selector: 'arth-confirm-address',
  templateUrl: './confirm-address.component.html'
})
export class ConfirmAddressComponent implements OnInit{

  appData: AppData;
  editMode: boolean = false;
  editedItem: string;
  profileUpdated: boolean;

  constructor(private dataService: DataService,
              private store: Store<UserProfile>) {}

  ngOnInit() {
    // Check if address is defined, otherwise edit it immediatly
    this.dataService.appData.subscribe(appData => {
      this.appData = appData;
      if (!this.appData.cartWizard.addressCompleted) {
        this.editMode = true;
        this.editedItem = "address";
      }
    });
  }

  editAddress(): void {
    this.dataService.doAction(Actions.ADDRESS_INCOMPLETE);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editedItem = undefined;
    if (this._completedData()) {
      this.dataService.doAction(Actions.ADDRESS_COMPLETED);
    }
  }

  updateMetaData(userMetaData): void {
    this.store.dispatch(new SetProfile(this.appData.profile.user_id, userMetaData));
    this.store.dispatch(new AddressCompleted());
    this.profileUpdated = true;
    this.editedItem = undefined;
    this.editMode = false;
  }

  private _completedData():boolean {
    return this.appData.profile && this.appData.profile.user_metadata && this.appData.profile.user_metadata.profileComplete;
  }

}
