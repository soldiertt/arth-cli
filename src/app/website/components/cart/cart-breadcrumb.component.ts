import {Component, OnInit} from "@angular/core";
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import * as fromCartData from '../../reducers/cart-data.reducer';

@Component({
  selector: 'arth-cart-breadcrumb',
  templateUrl: 'cart-breadcrumb.component.html',
  styleUrls: ['cart-breadcrumb.component.css']
})
export class CartBreadcrumbComponent implements OnInit {

  currentStep: number;

  constructor(private store: Store<CartData>) {}

  ngOnInit() {
    this.store.select(fromCartData.selectWizardState).subscribe(wizard => {
      this.currentStep = wizard.currentStep;
    });
  }
}
