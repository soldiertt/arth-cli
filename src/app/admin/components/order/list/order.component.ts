import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromOrder from '../../../reducers/order.reducer';
import * as actions from '../../../actions/order.actions';
import PaypalOrder from '../../../../shared/model/paypalorder.class';

@Component({
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orders$: Observable<PaypalOrder[]>;

  constructor(private store: Store<fromOrder.State>) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.orders$ = this.store.select(fromOrder.selectAll).map(orders => {
      return orders.map(order => {
        order.parsedJson = JSON.parse(order.json);
        return order;
      });
    });
    this.store.dispatch(new actions.GetAll());
  }

}
