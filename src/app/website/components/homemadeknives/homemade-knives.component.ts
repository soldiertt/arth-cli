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
  selector: 'arth-homemade-knives',
  templateUrl: 'homemade-knives.component.html'
})
export class HomemadeKnivesComponent implements OnInit {

  articles$: Observable<Article[]>;
  brand: Brand;

  constructor(private route: ActivatedRoute,
              private store: Store<ProductData>) {
  }

  ngOnInit() {
    this.articles$ = this.store.select(FromProduct.selectCurrentProductsState);
    this.store.dispatch(new ProductActions.LoadAllByCategory('homemade'));
  }

}
