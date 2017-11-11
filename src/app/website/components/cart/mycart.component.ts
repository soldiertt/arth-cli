import {Component, OnInit} from "@angular/core";
import Cart from "../../model/cart.class";
import Article from "../../../shared/model/article.class";
import CartData from '../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromCartData from '../../reducers/cart-data.reducer';
import {AddArticle, RemoveArticle, RemoveOrder} from '../../actions/cart-data.actions';
import {PictureService} from '../../../shared/service/picture.service';

@Component({
  selector: 'arth-mycart',
  templateUrl: 'mycart.component.html',
  styleUrls: ['mycart.component.css']
})
export class MyCartComponent implements OnInit {

  cart$: Observable<Cart>;

  constructor(public picUtil: PictureService,
              private store: Store<CartData>) { }

  ngOnInit() {
    this.cart$ = this.store.select(fromCartData.selectCartState);
  }

  addArticle($event, article: Article ) {
    $event.preventDefault();
    this.store.dispatch(new AddArticle(article));
  }

  removeArticle($event, articleId: string) {
    $event.preventDefault();
    this.store.dispatch(new RemoveArticle(articleId));
  }

  removeOrder($event, articleId: string) {
    $event.preventDefault();
    this.store.dispatch(new RemoveOrder(articleId));
  }

}
