import {Component, OnDestroy, OnInit} from "@angular/core";
import PaypalOrder from "../../../shared/model/paypalorder.class";
import {Store} from '@ngrx/store';
import UserProfile from '../../model/user-profile.class';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import {PaypalOrderActions} from '../../../shared/actions/paypal-order.actions';
import {FromPaypalOrder} from '../../reducers/paypal-order.reducer';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';

@Component({
  selector: 'arth-orders',
  templateUrl: './orders-component.html',
  styleUrls: ['./orders-component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  paypalOrders: PaypalOrder[];

  constructor(private profileStore: Store<UserProfile>,
              private store: Store<FromPaypalOrder.State>) {}

  ngOnInit() {
    this.store.select(FromPaypalOrder.selectAll)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(orders => {
        this.paypalOrders = orders;
        this.paypalOrders.forEach(paypalOrder => {
          paypalOrder.parsedJson = JSON.parse(paypalOrder.json);
        });
    });
    this.profileStore.select(FromProfile.selectUserId)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(userId => {
        this.store.dispatch(new PaypalOrderActions.GetAllForUser(userId));
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
