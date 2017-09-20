import {Component, OnInit} from "@angular/core";
import {UserRestService} from "../../service/user.rest.service";
import {DataService} from '../../service/data.service';
import {Actions} from '../../model/actions.class';
import AppData from '../../model/app-data';
import {ProfileService} from '../../service/profile.service';

@Component({
  selector: 'arth-confirm-address',
  templateUrl: './confirm-address.component.html'
})
export class ConfirmAddressComponent implements OnInit{

  appData: AppData;
  editMode: boolean = false;
  editedItem: string;
  profileUpdated: boolean;

  constructor(private dataService: DataService, private userRestService: UserRestService, private profileService: ProfileService) {}

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
    this.userRestService.updateProfile(this.appData.profile.user_id, userMetaData).subscribe(userProfile => {
      this.profileService.updateProfile(userProfile);
      this.profileUpdated = true;
      this.editedItem = undefined;
      this.editMode = false;
      this.dataService.doAction(Actions.ADDRESS_COMPLETED);
    });

  }

  private _completedData():boolean {
    return this.appData.profile && this.appData.profile.user_metadata && this.appData.profile.user_metadata.profileComplete;
  }

}
