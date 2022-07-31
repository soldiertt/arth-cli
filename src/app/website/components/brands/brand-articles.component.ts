import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import Article from '../../../shared/model/article.class';
import Brand from '../../../shared/model/brand.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import ProductData from '../../model/product-data.class';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';

@Component({
  selector: 'arth-brand-articles',
  templateUrl: 'brand-articles.component.html'
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
      this.brand.marque = brandName;
      this.store.dispatch(ProductActions.LoadAllByBrand({brand: this.brand}));
    });
  }

}
