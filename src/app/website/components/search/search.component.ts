import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Article from '../../../shared/model/article.class';
import ProductData from '../../model/product-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ArticleBoxComponent } from '../shared/article-box/article-box.component';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';
import { SortPipe } from '../../pipe/sort.pipe';

@Component({
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, FormsModule, ArticleBoxComponent, AsyncPipe, I18nPipe, SortPipe]
})
export class SearchComponent implements OnInit {
  private store = inject<Store<ProductData>>(Store);
  private route = inject(ActivatedRoute);


  articles$: Observable<Article[]>;
  searchTerm: string;
  _orderBy: string = 'name';

  ngOnInit() {
    this.articles$ = this.store.select(FromProduct.selectCurrentProductsState);

    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
      this.store.dispatch(ProductActions.Search({term: this.searchTerm}));
    });
  }

  get orderBy() {
    return this._orderBy;
  }

  set orderBy(value: string) {
    this._orderBy = value;
  }
}
