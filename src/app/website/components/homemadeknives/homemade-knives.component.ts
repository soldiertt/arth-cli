import {Component, OnInit} from '@angular/core';
import AdvancedArticle from '../../../shared/model/advanced-article.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AdvancedProductActions} from '../../actions/advanced-product.actions';
import {FromAdvancedProduct} from '../../reducers/advanced-product.reducer';

declare const $: any;

@Component({
  templateUrl: 'homemade-knives.component.html'
})
export class HomemadeKnivesComponent implements OnInit {

  articles$: Observable<AdvancedArticle[]>;

  constructor(private store: Store<AdvancedArticle[]>) {
  }

  ngOnInit() {
    this.articles$ = this.store.select(FromAdvancedProduct.selectLocalState);
    this.store.dispatch(AdvancedProductActions.FilterAllByCategory({categoryName: 'homemade'}));
  }
}
