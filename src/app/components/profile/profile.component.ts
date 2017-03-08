import {Component, OnInit} from "@angular/core";
import {UserRestService} from "../../service/user.rest.service";
import UserProfile from "../../model/user-profile.class";
import UserAddress from "../../model/user-address";
import PaypalOrder from "../../model/paypalorder.class";
import {PaypalOrderRestService} from "../../service/paypalorder.rest.service";
import {SessionService} from "../../service/session.service";

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
  paypalOrders: PaypalOrder[];

  constructor(private userRestService: UserRestService,
              private paypalOrderRestService: PaypalOrderRestService,
              private sessionService: SessionService) {}

  ngOnInit() {
    this.userProfile = this.sessionService.getProfile();
    this._updateLocalData();
    this._loadOrders();
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

  private _updateLocalData(): void {
    if (this.userProfile) {
      if (this.userProfile.user_metadata) {
        this.email = this.userProfile.user_metadata.email;
        if (this.userProfile.user_metadata.addresses) {
          this.deliveryAddress = this.userProfile.user_metadata.addresses.delivery;
        }
      }
      if (!this.email) {
        this.email = this.userProfile.email;
      }
    }
  }

  private _loadOrders(): void {
    if (this.userProfile) {
      this.paypalOrderRestService.listAllByUser(this.userProfile.user_id).subscribe((orders) => {
        this.paypalOrders = orders;
        this.paypalOrders.forEach(paypalOrder => {
          paypalOrder.parsedJson = JSON.parse(paypalOrder.json);
        })
      });
    }
  }
}
