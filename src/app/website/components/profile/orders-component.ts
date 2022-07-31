
import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import PaypalOrder from '../../../shared/model/paypalorder.class';
import {Store} from '@ngrx/store';
import UserProfile from '../../model/user-profile.class';

import {Subject} from 'rxjs';
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
              private store: Store<FromPaypalOrder.State>) {
  }

  ngOnInit() {
    this.store.select(FromPaypalOrder.selectAll).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(orders => {
        this.paypalOrders = orders;
        this.paypalOrders.forEach(paypalOrder => {
          paypalOrder.parsedJson = JSON.parse(paypalOrder.json);
        });
      });
    this.profileStore.select(FromProfile.selectUserId).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe((userId) => {
        if (userId) {
          this.store.dispatch(PaypalOrderActions.GetAllForUser({userId}));
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
