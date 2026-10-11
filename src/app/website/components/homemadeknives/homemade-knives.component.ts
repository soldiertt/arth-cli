import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import AdvancedArticle from '../../../shared/model/advanced-article.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {FromAdvancedProduct} from '../../reducers/advanced-product.reducer';
import { RouterLink } from '@angular/router';
import { CustomKnifeComponent } from './custom-knife/custom-knife.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { AdvancedArticleBoxComponent } from '../shared/advanced-article-box/advanced-article-box.component';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    templateUrl: 'homemade-knives.component.html',
    imports: [RouterLink, CustomKnifeComponent, NgFor, AdvancedArticleBoxComponent, AsyncPipe, I18nPipe]
})
export class HomemadeKnivesComponent implements OnInit {

  articles$: Observable<AdvancedArticle[]>;

  constructor(private store: Store<AdvancedArticle[]>) {
  }

  ngOnInit() {
    this.articles$ = this.store.select(FromAdvancedProduct.selectLocalState).pipe(map(articles => {
      return articles.filter(article => article.type === 'homemadeknives');
    }));
  }
}
