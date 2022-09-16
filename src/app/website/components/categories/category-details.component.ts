import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import ProductData from '../../model/product-data.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';

@Component({
  templateUrl: 'category-details.component.html',
  styleUrls: ['category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  productData$: Observable<ProductData>;

  _orderBy: string = 'brand';

  constructor(private store: Store<ProductData>,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.productData$ = this.store.select(FromProduct.selectLocalState);

    this.activeRoute.params.subscribe((params: Params) => {
      const categoryType = params['type'];

      this.store.dispatch(ProductActions.LoadAllByCategory({categoryName: categoryType}));

    });

  }

  get orderBy() {
    return this._orderBy;
  }

  set orderBy(value: string) {
    this._orderBy = value;
  }

}
