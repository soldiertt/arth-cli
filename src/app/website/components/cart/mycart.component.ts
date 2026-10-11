import {Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import {OrderArticle} from '../../../shared/model/order-article';
import Cart from '../../model/cart.class';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PictureService} from '../../../shared/service/picture.service';
import {CartDataActions} from '../../actions/cart-data.actions';
import {FromCartData} from '../../reducers/cart-data.reducer';
import Order from '../../../shared/model/order.class';
import {AsyncPipe, DecimalPipe, CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {EngravingModalComponent} from './engraving/engraving-modal.component';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-mycart',
    templateUrl: 'mycart.component.html',
    styleUrls: ['mycart.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, EngravingModalComponent, AsyncPipe, DecimalPipe, CurrencyPipe, I18nPipe]
})
export class MyCartComponent implements OnInit {
  picUtil = inject(PictureService);
  private store = inject<Store<CartData>>(Store);

  cart$: Observable<Cart>;
  editedOrder: Order;

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

  engravingModal(order: Order) {
    this.editedOrder = order;
  }

  removeEngraving($event, order: Order) {
    $event.preventDefault();
    this.editedOrder = order;
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
