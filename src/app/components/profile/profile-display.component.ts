import {Component, EventEmitter, Output, OnInit} from "@angular/core";
import UserProfile from "../../model/user-profile.class";
import UserAddress from "../../model/user-address";
import {DataService} from '../../service/data.service';
@Component({
  selector: 'arth-profile-display',
  templateUrl: 'profile-display.component.html'
})
export class ProfileDisplayComponent implements OnInit {

  @Output() edit: EventEmitter<string> = new EventEmitter();

  profile: UserProfile;
  address: UserAddress;
  phone: string;
  name: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.appData.subscribe(appData => {
      this.profile = appData.profile;
      if (this.profile && this.profile.user_metadata) {
        if (this.profile.user_metadata.addresses) {
          this.address = this.profile.user_metadata.addresses.delivery;
        }
        this.phone = this.profile.user_metadata.phone;
        this.name = this.profile.user_metadata.name;
      }
    });

  }

  editContactInfo(): void {
    this.edit.emit('contactinfo');
  }

}
