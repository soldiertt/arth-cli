
import {map} from 'rxjs/operators';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import PaypalOrder from '../../../../shared/model/paypalorder.class';
import {PaypalOrderActions} from '../../../../shared/actions/paypal-order.actions';
import {FromAdminPaypalOrder} from '../../../reducers/paypal-order.reducer';
import { AsyncPipe, JsonPipe, DatePipe } from '@angular/common';

@Component({
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe, JsonPipe, DatePipe]
})
export class OrderComponent implements OnInit {
  private store = inject<Store<FromAdminPaypalOrder.State>>(Store);


  orders$: Observable<PaypalOrder[]>;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.orders$ = this.store.select(FromAdminPaypalOrder.selectAll).pipe(map(orders => {
      return orders.map(order => {
        order.parsedJson = JSON.parse(order.json);
        return order;
      });
    }));
    this.store.dispatch(PaypalOrderActions.GetAll());
  }

}
