import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import UserAddress from "../../model/user-address";
import UserProfile from "../../model/user-profile.class";
import {UserRestService} from "../../service/user.rest.service";
import {SessionService} from "../../service/session.service";
@Component({
  selector: 'arth-confirm-address',
  templateUrl: './confirm-address.component.html'
})
export class ConfirmAddressComponent implements OnInit{

  @Output() moveStep: EventEmitter<number> = new EventEmitter();
  editMode: boolean = false;
  editedItem: string;
  deliveryAddress: UserAddress;
  phone: string;
  userProfile: UserProfile;
  profileUpdated: boolean;

  constructor(private userRestService: UserRestService, private sessionService: SessionService) {}

  ngOnInit() {
    this.userProfile = this.sessionService.getProfile();
    this._updateLocalData();
    // Check if address is defined, otherwise edit it immediatly
    if (!this.deliveryAddress) {
      this.editAddress();
    }
  }

  editAddress(): void {
    this.editMode = true;
    this.editedItem = "address";
  }

  completedData():boolean {
    return this.userProfile && this.userProfile.user_metadata && this.userProfile.user_metadata.profileComplete;
  }

  nextStep(): void {
    this.moveStep.emit(4);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editedItem = undefined;
  }

  updateMetaData(userMetaData): void {
    this.userRestService.updateProfile(this.userProfile.user_id, userMetaData).subscribe(userProfile => {
      this.sessionService.saveProfile(userProfile);
      this.userProfile = userProfile;
      this._updateLocalData();
      this.profileUpdated = true;
      this.editedItem = undefined;
      this.editMode = false;
      this.nextStep();
    });

  }

  private _updateLocalData(): void {
    if (this.userProfile && this.userProfile.user_metadata) {
      if (this.userProfile.user_metadata.addresses) {
          this.deliveryAddress = this.userProfile.user_metadata.addresses.delivery;
      }
      if (this.userProfile.user_metadata.phone) {
        this.phone = this.userProfile.user_metadata.phone;
      }
    }
  }

}
