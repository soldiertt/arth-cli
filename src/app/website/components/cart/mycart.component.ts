import {Component, inject, OnInit} from '@angular/core';
import {OrderArticle} from '../../../shared/model/order-article';
import Cart from '../../model/cart.class';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PictureService} from '../../../shared/service/picture.service';
import {CartDataActions} from '../../actions/cart-data.actions';
import {FromCartData} from '../../reducers/cart-data.reducer';
import Order from '../../../shared/model/order.class';
import {AsyncPipe, CurrencyPipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {EngravingModalComponent} from './engraving/engraving-modal.component';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-mycart',
    templateUrl: 'mycart.component.html',
    styleUrls: ['mycart.component.css'],
    imports: [RouterLink, AsyncPipe, DecimalPipe, CurrencyPipe, I18nPipe]
})
export class MyCartComponent implements OnInit {
  picUtil = inject(PictureService);
  private store = inject<Store<CartData>>(Store);
  private dialog = inject(MatDialog);

  cart$: Observable<Cart>;

  ngOnInit() {
    this.cart$ = this.store.select(FromCartData.selectCartState);
  }

  addArticle($event, article: OrderArticle) {
    $event.preventDefault();
    this.store.dispatch(CartDataActions.AddArticle({article}));
  }

  removeArticle($event, articleId: string) {
    $event.preventDefault();
    this.store.dispatch(CartDataActions.RemoveArticle({articleId}));
  }

  removeOrder($event, articleId: string) {
    $event.preventDefault();
    this.store.dispatch(CartDataActions.RemoveOrder({articleId}));
  }

  engravingModal($event, order: Order) {
    $event.preventDefault();
    this.dialog.open(EngravingModalComponent, {data: order});
  }

  removeEngraving($event, order: Order) {
    $event.preventDefault();
    this.store.dispatch(CartDataActions.DisableOrderEngraving({articleId: order.article.id}));
  }

  orderTotalPrice(order: Order): number {
    let engravingPrice = 0;
    if (order.engraving) {
      engravingPrice += 15;
    }
    return (order.article.price * order.count) + engravingPrice;
  }
}
