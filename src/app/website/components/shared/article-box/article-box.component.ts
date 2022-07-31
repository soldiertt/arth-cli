import {Component, Input} from '@angular/core';
import Article from '../../../../shared/model/article.class';
import {JQueryService} from '../../../service/jQuery.service';
import CartData from '../../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {PictureService} from '../../../../shared/service/picture.service';
import {CartDataActions} from '../../../actions/cart-data.actions';

declare const $: any;

@Component({
  selector: 'arth-article-box',
  templateUrl: 'article-box.component.html',
  styleUrls: ['article-box.component.css']
})
export class ArticleBoxComponent {

  constructor(public picUtil: PictureService, private store: Store<CartData>, private jQueryService: JQueryService) {
  }

  @Input() article: Article;

  addToCart(article) {
    const component = this;
    const callback = function () {
      component.store.dispatch(CartDataActions.AddArticle({article}));
    };
    this.jQueryService.addToCart($, callback);
  }
}
