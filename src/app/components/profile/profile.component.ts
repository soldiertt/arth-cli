import {Component, OnInit} from "@angular/core";
import {UserRestService} from "../../service/user.rest.service";
import UserProfile from "../../model/user-profile.class";
import UserAddress from "../../model/user-address";
import {SessionService} from "../../service/session.service";
import UserMetaData from "../../model/usermetadata.class";
import {MailService} from "../../service/mail.service";
import Mail from "../../model/mail.class";

@Component({
  selector: 'arth-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  profileUpdated: boolean = false;
  editMode: boolean = false;
  editedItem: string;
  userProfile: UserProfile;
  deliveryAddress: UserAddress;
  email: string;
  pendingRemoval: boolean;
  phone: string;

  constructor(private userRestService: UserRestService,
              private sessionService: SessionService,
              private mailService: MailService) {}

  ngOnInit() {
    this.userProfile = this.sessionService.getProfile();
    this._updateLocalData();

  }

  editAddress(): void {
    this.editMode = true;
    this.editedItem = "address";
  }

  editEmail(): void {
    this.editMode = true;
    this.editedItem = "email";
  }

  cancelEdit(event): void {
    this.editedItem = undefined;
    this.editMode = false;
  }

  updateMetaData(userMetaData): void {
    this.userRestService.updateProfile(this.userProfile.user_id, userMetaData).subscribe(userProfile => {
      this.sessionService.saveProfile(userProfile);
      this.userProfile = userProfile;
      this._updateLocalData();
      this.profileUpdated = true;
      this.editedItem = undefined;
      this.editMode = false;
    });
  }

  askForRemoval() : void {
    let userMetaData: UserMetaData = {pendingRemoval: true};
    this.updateMetaData(userMetaData);
    let mail: Mail = new Mail();
    mail.recipientEmail = "soldiertt@gmail.com";
    mail.recipientName = "Jean-Louis Bourlet";
    mail.template = "ACCOUNT_DELETION";
    mail.parameters = {"userEmail" : this.email, "userId": this.userProfile.user_id};
    this.mailService.sendMail(mail).subscribe(resp => {
      console.log("Mail sent !");
    });
  }

  cancelAskForRemoval() : void {
    let userMetaData: UserMetaData = {pendingRemoval: false};
    this.updateMetaData(userMetaData);
    let mail: Mail = new Mail();
    mail.recipientEmail = "soldiertt@gmail.com";
    mail.recipientName = "Jean-Louis Bourlet";
    mail.template = "ACCOUNT_DELETION_CANCEL";
    mail.parameters = {"userEmail" : this.email, "userId": this.userProfile.user_id};
    this.mailService.sendMail(mail).subscribe(resp => {
      console.log("Mail sent !");
    });
  }

  private _updateLocalData(): void {
    if (this.userProfile) {
      if (this.userProfile.user_metadata) {
        this.pendingRemoval = this.userProfile.user_metadata.pendingRemoval ? this.userProfile.user_metadata.pendingRemoval : false;
        this.email = this.userProfile.user_metadata.email;
        if (this.userProfile.user_metadata.addresses) {
          this.deliveryAddress = this.userProfile.user_metadata.addresses.delivery;
        }
        if (this.userProfile.user_metadata.phone) {
          this.phone = this.userProfile.user_metadata.phone;
        }
      }
      if (!this.email) {
        this.email = this.userProfile.email;
      }
    }
  }


}
