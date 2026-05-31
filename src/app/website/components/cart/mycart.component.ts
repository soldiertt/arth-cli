import {Component, OnInit} from '@angular/core';
import {OrderArticle} from '../../../shared/model/order-article';
import Cart from '../../model/cart.class';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PictureService} from '../../../shared/service/picture.service';
import {CartDataActions} from '../../actions/cart-data.actions';
import {FromCartData} from '../../reducers/cart-data.reducer';
import Order from '../../../shared/model/order.class';

@Component({
  selector: 'arth-mycart',
  templateUrl: 'mycart.component.html',
  styleUrls: ['mycart.component.css']
})
export class MyCartComponent implements OnInit {

  cart$: Observable<Cart>;
  editedOrder: Order;

  constructor(public picUtil: PictureService,
              private store: Store<CartData>) {
  }

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
}
