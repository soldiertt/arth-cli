import {Component, OnInit} from "@angular/core";
import PaypalOrder from "../../../shared/model/paypalorder.class";
import {Store} from '@ngrx/store';
import * as fromPaypalOrder from '../../reducers/paypal-order.reducer';
import * as fromProfile from '../../../root/reducers/user-profile.reducer';
import {GetAllForUser} from '../../actions/paypal-order.actions';
import UserProfile from '../../model/user-profile.class';

@Component({
  selector: 'arth-orders',
  templateUrl: './orders-component.html',
  styleUrls: ['./orders-component.css']
})
export class OrdersComponent implements OnInit {

  paypalOrders: PaypalOrder[];

  constructor(private profileStore: Store<UserProfile>,
              private store: Store<fromPaypalOrder.State>) {}

  ngOnInit() {
    this.store.select(fromPaypalOrder.selectAll).subscribe(orders => {
      this.paypalOrders = orders;
      this.paypalOrders.forEach(paypalOrder => {
        paypalOrder.parsedJson = JSON.parse(paypalOrder.json);
      });
    });
    this.profileStore.select(fromProfile.selectLocalState).subscribe(profile => {
      this.store.dispatch(new GetAllForUser(profile.user_id));
    });
  }

}
