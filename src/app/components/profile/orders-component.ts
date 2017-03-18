import {Component, OnInit} from "@angular/core";
import PaypalOrder from "../../model/paypalorder.class";
import {PaypalOrderRestService} from "../../service/paypalorder.rest.service";
import {SessionService} from "../../service/session.service";
import UserProfile from "../../model/user-profile.class";
@Component({
  selector: 'arth-orders',
  templateUrl: './orders-component.html'
})
export class OrdersComponent implements OnInit {

  userProfile: UserProfile;
  paypalOrders: PaypalOrder[];

  constructor(private paypalOrderRestService: PaypalOrderRestService,
              private sessionService: SessionService) {}

  ngOnInit() {
    this.userProfile = this.sessionService.getProfile();
    this._loadOrders();
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
