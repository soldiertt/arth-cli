import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import ProductData from '../../model/product-data.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ProductActions} from '../../actions/product.actions';
import {FromProduct} from '../../reducers/product.reducer';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TopSalesComponent} from '../shared/topsales/topsales.component';
import {StaticContentCategoryComponent} from '../static-content-category/static-content-category.component';
import {ArticleBoxComponent} from '../shared/article-box/article-box.component';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';
import {CategoryTitlePipe} from '../../pipe/category-title.pipe';
import {SortPipe} from '../../pipe/sort.pipe';

@Component({
    templateUrl: 'category-details.component.html',
    styleUrls: ['category-details.component.css'],
    imports: [RouterLink, FormsModule, TopSalesComponent, StaticContentCategoryComponent, ArticleBoxComponent, AsyncPipe, I18nPipe, CategoryTitlePipe, SortPipe]
})
export class CategoryDetailsComponent implements OnInit {
  private store = inject<Store<ProductData>>(Store);
  private activeRoute = inject(ActivatedRoute);

  productData$: Observable<ProductData>;

  _orderBy: string = 'brand';

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
