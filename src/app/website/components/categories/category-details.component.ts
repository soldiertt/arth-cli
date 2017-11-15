import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import ProductData from '../../model/product-data.class';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';

declare const $: any;

@Component({
  selector: 'arth-category-details',
  templateUrl: 'category-details.component.html',
  styleUrls: ['category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  productData$: Observable<ProductData>;

  _orderBy: string = 'name';

  constructor(private store: Store<ProductData>,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.productData$ = this.store.select(FromProduct.selectLocalState);

    this.activeRoute.params.subscribe((params: Params) => {
      $('html,body').animate({scrollTop: 0}, 0);
      const categoryType = params['type'];

      this.store.dispatch(new ProductActions.LoadAllByCategory(categoryType));

    });

  }

  get orderBy() {
    return this._orderBy;
  }

  set orderBy(value: string) {
    this._orderBy = value;
  }

}
