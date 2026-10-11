import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';

import Article from '../../../shared/model/article.class';
import Brand from '../../../shared/model/brand.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import ProductData from '../../model/product-data.class';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';
import { NgFor, AsyncPipe } from '@angular/common';
import { ArticleBoxComponent } from '../shared/article-box/article-box.component';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-brand-articles',
    templateUrl: 'brand-articles.component.html',
    imports: [RouterLink, NgFor, ArticleBoxComponent, AsyncPipe, I18nPipe]
})
export class BrandArticlesComponent implements OnInit {

  articles$: Observable<Article[]>;
  brand: Brand;

  constructor(private route: ActivatedRoute,
              private store: Store<ProductData>) {
  }

  ngOnInit() {
    this.articles$ = this.store.select(FromProduct.selectCurrentProductsState);

    this.route.params.subscribe((params: Params) => {
      const brandName = params['type'];
      this.brand = new Brand();
      this.brand.brand = brandName;
      this.store.dispatch(ProductActions.LoadAllByBrand({brand: this.brand}));
    });
  }

}
