import {Component, OnInit} from '@angular/core';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import CartWizard from '../../model/cart-wizard.class';
import {Observable} from 'rxjs/Observable';
import {FromCartData} from '../../reducers/cart-data.reducer';

@Component({
  selector: 'arth-cart-breadcrumb',
  templateUrl: 'cart-breadcrumb.component.html',
  styleUrls: ['cart-breadcrumb.component.css']
})
export class CartBreadcrumbComponent implements OnInit {

  wizard$: Observable<CartWizard>;

  constructor(private store: Store<CartData>) {
  }

  ngOnInit() {
    this.wizard$ = this.store.select(FromCartData.selectWizardState);
  }
}
