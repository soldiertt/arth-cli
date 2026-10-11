import { Component, OnInit, inject } from '@angular/core';
import Cart from '../../../model/cart.class';
import CartData from '../../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PictureService} from '../../../../shared/service/picture.service';
import {CartDataActions} from '../../../actions/cart-data.actions';
import {FromCartData} from '../../../reducers/cart-data.reducer';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nPipe } from '../../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-cart-dropdown',
    templateUrl: 'cart-dropdown.component.html',
    styleUrls: ['cart-dropdown.component.css'],
    imports: [RouterLink, AsyncPipe, I18nPipe]
})
export class CartDropdownComponent implements OnInit {
  picUtil = inject(PictureService);
  private store = inject<Store<CartData>>(Store);


  cart$: Observable<Cart>;

  ngOnInit() {
    this.cart$ = this.store.select(FromCartData.selectCartState);
  }

  removeOrder($event, articleId: string | undefined) {
    $event.stopPropagation();
    if (articleId) {
      this.store.dispatch(CartDataActions.RemoveOrder({articleId}));
    }
  }

}
