import {Component, OnInit} from "@angular/core";
import {UserRestService} from "../../../shared/service/rest/user.rest.service";
import UserProfile from "../../model/user-profile.class";
import UserAddress from "../../model/user-address";
import UserMetaData from "../../model/usermetadata.class";
import {MailService} from "../../service/mail.service";
import Mail from "../../model/mail.class";
import {ProfileService} from '../../service/profile.service';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'arth-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  profileUpdated: boolean = false;
  editMode: boolean = false;
  editedItem: string;
  deliveryAddress: UserAddress;
  email: string;
  pendingRemoval: boolean;
  phone: string;
  incompleteProfile: boolean = true;
  userProfile: UserProfile;

  constructor(private dataService: DataService,
              private userRestService: UserRestService,
              private profileService: ProfileService,
              private mailService: MailService) {}

  ngOnInit() {
    this.dataService.appData.subscribe(appData => {
      this.userProfile = appData.profile;
    });
    this._updateLocalData(this.dataService.appData.getValue().profile);
    if (this.incompleteProfile) {
      this.editContactInfo();
    }
  }

  editContactInfo(): void {
    this.editMode = true;
    this.editedItem = "contactinfo";
  }

  editEmail(): void {
    this.editMode = true;
    this.editedItem = "email";
  }

  cancelEdit(): void {
    this.editedItem = undefined;
    this.editMode = false;
  }

  updateMetaData(userMetaData): void {
    this.userRestService.updateProfile(this.userProfile.user_id, userMetaData).subscribe(userProfile => {
      this.profileService.updateProfile(userProfile);
      this._updateLocalData(userProfile);
      this.profileUpdated = true;
      this.incompleteProfile = false;
      this.cancelEdit();
    });
  }

  askForRemoval() : void {
    let userMetaData: UserMetaData = new UserMetaData();
    userMetaData.pendingRemoval = true;
    this.updateMetaData(userMetaData);
    let mail: Mail = new Mail("ACCOUNT_DELETION");
    this.mailService.sendMail(this.userProfile.user_id, mail).subscribe(resp => {
      console.log("Mail sent !");
    });
  }

  cancelAskForRemoval() : void {
    let userMetaData: UserMetaData = new UserMetaData();
    userMetaData.pendingRemoval = false;
    this.updateMetaData(userMetaData);
    let mail: Mail = new Mail("ACCOUNT_DELETION_CANCEL");
    this.mailService.sendMail(this.userProfile.user_id, mail).subscribe(resp => {
      console.log("Mail sent !");
    });
  }

  private _updateLocalData(userProfile: UserProfile): void {
    if (userProfile) {
      if (userProfile.user_metadata) {
        this.email = userProfile.user_metadata.email;
        this.pendingRemoval = userProfile.user_metadata.pendingRemoval ? userProfile.user_metadata.pendingRemoval : false;
        this.incompleteProfile = userProfile.user_metadata.profileComplete ? !userProfile.user_metadata.profileComplete : true;
        if (userProfile.user_metadata.addresses) {
          this.deliveryAddress = userProfile.user_metadata.addresses.delivery;
        }
        if (userProfile.user_metadata.phone) {
          this.phone = userProfile.user_metadata.phone;
        }
      }
    }
  }


}
