import {Component, Input, EventEmitter, Output, OnChanges} from "@angular/core";
import UserProfile from "../../model/user-profile.class";
import UserAddress from "../../model/user-address";
@Component({
  selector: 'arth-profile-display',
  templateUrl: 'profile-display.component.html'
})
export class ProfileDisplayComponent implements OnChanges {

  @Input() profile: UserProfile;
  @Output() edit: EventEmitter<string> = new EventEmitter();

  address: UserAddress;
  phone: string;
  name: string;

  ngOnChanges() {
    if (this.profile && this.profile.user_metadata) {
      if (this.profile.user_metadata.addresses) {
        this.address = this.profile.user_metadata.addresses.delivery;
      }
      this.phone = this.profile.user_metadata.phone;
      this.name = this.profile.user_metadata.name;
    }
  }

  editContactInfo(): void {
    this.edit.emit('contactinfo');
  }

}
