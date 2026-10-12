import {Component, inject, OnInit} from '@angular/core';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import CartWizard from '../../model/cart-wizard.class';
import {Observable} from 'rxjs';
import {FromCartData} from '../../reducers/cart-data.reducer';
import {AsyncPipe} from '@angular/common';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-cart-breadcrumb',
    templateUrl: 'cart-breadcrumb.component.html',
    styleUrls: ['cart-breadcrumb.component.css'],
    imports: [AsyncPipe, I18nPipe]
})
export class CartBreadcrumbComponent implements OnInit {
  private store = inject<Store<CartData>>(Store);

  wizard$: Observable<CartWizard>;

  ngOnInit() {
    this.wizard$ = this.store.select(FromCartData.selectWizardState);
  }
}
