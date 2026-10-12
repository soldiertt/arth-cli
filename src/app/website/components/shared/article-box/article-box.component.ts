import {Component, inject, input} from '@angular/core';
import Article from '../../../../shared/model/article.class';
import {JQueryService} from '../../../service/jQuery.service';
import CartData from '../../../model/cart-data.class';
import {Store} from '@ngrx/store';
import {PictureService} from '../../../../shared/service/picture.service';
import {CartDataActions} from '../../../actions/cart-data.actions';
import {RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {I18nPipe} from '../../../../shared/i18n/i18n.pipe';

declare const $: any;

@Component({
    selector: 'arth-article-box',
    templateUrl: 'article-box.component.html',
    styleUrls: ['article-box.component.css'],
    imports: [RouterLink, CurrencyPipe, I18nPipe]
})
export class ArticleBoxComponent {
  picUtil = inject(PictureService);
  private store = inject<Store<CartData>>(Store);
  private jQueryService = inject(JQueryService);


  readonly article = input.required<Article>();

  addToCart(article) {
    const component = this;
    const callback = function () {
      component.store.dispatch(CartDataActions.AddArticle({article}));
    };
    this.jQueryService.addToCart($, callback);
  }
}
