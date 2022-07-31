
import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import PaypalOrder from '../../../../shared/model/paypalorder.class';
import {PaypalOrderActions} from '../../../../shared/actions/paypal-order.actions';
import {FromAdminPaypalOrder} from '../../../reducers/paypal-order.reducer';

@Component({
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orders$: Observable<PaypalOrder[]>;

  constructor(private store: Store<FromAdminPaypalOrder.State>) {
  }

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
