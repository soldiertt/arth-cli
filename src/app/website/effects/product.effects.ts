import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Pay, UPDATE_TOP_SALES, UpdateTopSalesSuccess} from '../actions/cart-data.actions';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {GET_ALL, GetAllSuccess} from '../actions/promo-product.actions';
import {LOAD_ONE, LoadOne, LoadOneSuccess} from '../actions/product.actions';
import {CategoryRestService} from '../../shared/service/rest/category.rest.service';
import ProductItemData from '../model/product-item-data.class';

@Injectable()
export class ProductEffects {

  constructor(private actions: Actions,
              private productRestService: ArticleRestService,
              private categoryRestService: CategoryRestService) {}

  @Effect()
  getAllPromo: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.productRestService.listAllPromo())
    .map(entities => new GetAllSuccess(entities));

  @Effect()
  updateTopSales: Observable<Action> = this.actions.ofType(UPDATE_TOP_SALES)
    .mergeMap((action: Pay) => this.productRestService.updateTopSales(action.orders))
    .map(_ => new UpdateTopSalesSuccess());

  @Effect()
  loadProduct: Observable<Action> = this.actions.ofType(LOAD_ONE)
    .mergeMap((action: LoadOne) => this.productRestService.findById(action.productId))
    .mergeMap(product => this.categoryRestService.findCategory(product.type).map(category => {
      const productItemData: ProductItemData = {product, category};
      return productItemData;
    }))
    .mergeMap(productItemData => {
      if (productItemData.category.parent) {
        return this.categoryRestService.findCategory(productItemData.category.parent).map(parentCategory => {
          return {...productItemData, parentCategory};
        })
      } else {
        return Observable.of(productItemData);
      }
    })
    .map(productItemData => new LoadOneSuccess(productItemData));

}
