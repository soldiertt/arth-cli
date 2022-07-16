import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Article from '../../../shared/model/article.class';
import ProductData from '../../model/product-data.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';

@Component({
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  articles$: Observable<Article[]>;
  searchTerm: string;
  _orderBy: string = 'name';

  constructor(private store: Store<ProductData>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.articles$ = this.store.select(FromProduct.selectCurrentProductsState);

    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
      this.store.dispatch(new ProductActions.Search(this.searchTerm));
    });
  }

  get orderBy() {
    return this._orderBy;
  }

  set orderBy(value: string) {
    this._orderBy = value;
  }
}
