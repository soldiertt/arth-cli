import {Component, OnInit, Input} from "@angular/core";
import UserProfile from "../../model/user-profile.class";
import {UserRestService} from "../../service/user.rest.service";
import {SessionService} from "../../service/session.service";
import {DataService} from '../../service/data.service';
import {Actions} from '../../model/actions.class';
import AppData from '../../model/app-data';

@Component({
  selector: 'arth-confirm-address',
  templateUrl: './confirm-address.component.html'
})
export class ConfirmAddressComponent implements OnInit{

  appData: AppData;
  editMode: boolean = false;
  editedItem: string;
  @Input() userProfile: UserProfile;
  profileUpdated: boolean;

  constructor(private dataService: DataService, private userRestService: UserRestService, private sessionService: SessionService) {}

  ngOnInit() {
    // Check if address is defined, otherwise edit it immediatly
    this.dataService.appData.subscribe(appData => {
      this.appData = appData;
      if (!this.appData.cartData.addressCompleted) {
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
    this.userRestService.updateProfile(this.userProfile.user_id, userMetaData).subscribe(userProfile => {
      this.sessionService.saveProfile(userProfile);
      this.userProfile = userProfile;
      this.profileUpdated = true;
      this.editedItem = undefined;
      this.editMode = false;
      this.dataService.doAction(Actions.ADDRESS_COMPLETED);
    });

  }

  private _completedData():boolean {
    return this.userProfile && this.userProfile.user_metadata && this.userProfile.user_metadata.profileComplete;
  }

}
