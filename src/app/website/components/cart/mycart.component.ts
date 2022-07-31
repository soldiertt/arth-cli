import {Component, OnInit} from '@angular/core';
import {OrderArticle} from '../../../shared/model/order-article';
import Cart from '../../model/cart.class';
import Article from '../../../shared/model/article.class';
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PictureService} from '../../../shared/service/picture.service';
import {CartDataActions} from '../../actions/cart-data.actions';
import {FromCartData} from '../../reducers/cart-data.reducer';

@Component({
  selector: 'arth-mycart',
  templateUrl: 'mycart.component.html',
  styleUrls: ['mycart.component.css']
})
export class MyCartComponent implements OnInit {

  cart$: Observable<Cart>;

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

}
