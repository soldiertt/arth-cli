import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {AdvancedArticleRestService} from '../../shared/service/rest/advanced-article.rest.service';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {CategoryRestService} from '../../shared/service/rest/category.rest.service';
import {AdvancedProductActions} from '../actions/advanced-product.actions';
import ProductItemData from '../model/product-item-data.class';
import ProductData from '../model/product-data.class';
import {CartDataActions} from '../actions/cart-data.actions';
import {ProductActions} from '../actions/product.actions';
import {PromoProductActions} from '../actions/promo-product.actions';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class AdvancedProductEffects {

  constructor(private actions$: Actions,
              private advancedProductRestService: AdvancedArticleRestService) {}

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(AdvancedProductActions.LoadAll),
    mergeMap((action) => {
      return this.advancedProductRestService.listAll();
    }),
    map(products => AdvancedProductActions.LoadAllSuccess({productData: products}))
    )
  );
}
