
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Component, DestroyRef, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import PaypalOrder from '../../../shared/model/paypalorder.class';
import {Store} from '@ngrx/store';
import UserProfile from '../../model/user-profile.class';
import {PaypalOrderActions} from '../../../shared/actions/paypal-order.actions';
import {FromPaypalOrder} from '../../reducers/paypal-order.reducer';
import {FromProfile} from '../../../root/reducers/user-profile.reducer';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-orders',
    templateUrl: './orders-component.html',
    styleUrls: ['./orders-component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CurrencyPipe, DatePipe, I18nPipe]
})
export class OrdersComponent implements OnInit {
  private profileStore = inject<Store<UserProfile>>(Store);
  private store = inject<Store<FromPaypalOrder.State>>(Store);
  private destroyRef = inject(DestroyRef);

  paypalOrders: PaypalOrder[];

  ngOnInit() {
    this.store.select(FromPaypalOrder.selectAll).pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe(orders => {
        this.paypalOrders = orders;
        this.paypalOrders.forEach(paypalOrder => {
          paypalOrder.parsedJson = JSON.parse(paypalOrder.json);
        });
      });
    this.profileStore.select(FromProfile.selectUserId).pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe((userId) => {
        if (userId) {
          this.store.dispatch(PaypalOrderActions.GetAllForUser({userId}));
        }
      });
  }

}
