import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {CategoryRestService} from '../../shared/service/rest/category.rest.service';
import ProductItemData from '../model/product-item-data.class';
import ProductData from '../model/product-data.class';
import {CartDataActions} from '../actions/cart-data.actions';
import {ProductActions} from '../actions/product.actions';
import {PromoProductActions} from '../actions/promo-product.actions';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private productRestService: ArticleRestService,
              private categoryRestService: CategoryRestService) {}

  getAllPromo$ = createEffect(() => this.actions$.pipe(
    ofType(PromoProductActions.GetAll),
    mergeMap(() => this.productRestService.listAllPromo()),
    map(entities => PromoProductActions.GetAllSuccess({entities}))
  ));

  updateTopSales$ = createEffect(() => this.actions$.pipe(
    ofType(CartDataActions.UpdateTopSales),
    mergeMap((action) => this.productRestService.updateTopSales(action.orders)),
    map(_ => CartDataActions.UpdateTopSalesSuccess())
  ));

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.LoadOne),
    mergeMap((action) => this.productRestService.findById(action.productId)),
    mergeMap(product => this.categoryRestService.findCategory(product.type).pipe(map(category => ({product, category})))),
    mergeMap(productItemData => {
      if (productItemData.category.parent) {
        return this.categoryRestService.findCategory(productItemData.category.parent).pipe(
          map(parentCategory => ({...productItemData, parentCategory}))
        );
      } else {
        return of(productItemData);
      }
    }),
    map(productItemData => ProductActions.LoadOneSuccess({productItemData}))
    )
  );

  loadAllByBrand$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.LoadAllByBrand),
    mergeMap((action) => this.productRestService.findByBrand(action.brand.brand)),
    map(entities => ProductActions.LoadAllByBrandSuccess({entities}))
    )
  );

  search$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.Search),
    mergeMap((action) => this.productRestService.search(action.term)),
    map(entities => ProductActions.SearchSuccess({entities}))
    )
  );

  loadAllByCategory$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.LoadAllByCategory),
    mergeMap((action) =>
      this.categoryRestService.findCategory(action.categoryName).pipe(
        map(category => {
          const productData = new ProductData();
          productData.selected = new ProductItemData();
          productData.selected.category = category;
          return productData;
        }))
    ),
    mergeMap(productData => {
      if (productData.selected.category.parent) {
        return this.categoryRestService.findCategory(productData.selected.category.parent).pipe(
          map(parentCategory => {
            productData.selected.parentCategory = parentCategory;
            return productData;
          }));
      } else {
        return of(productData);
      }
    }),
    mergeMap(productData => this.categoryRestService.listSubCategories(productData.selected.category.name).pipe(
      map(subCategories => {
        productData.subCategories = subCategories;
        return productData;
      }))
    ),
    mergeMap(productData => {
      if (!productData.subCategories.length) {
        return this.productRestService.findByCategory(productData.selected.category.name).pipe(
          map(products => {
            productData.currentProducts = products;
            return productData;
          })
        );
      } else {
        return of(productData);
      }
    }),
    mergeMap(productData => {
      return this.productRestService.findTopSalesByCategory(productData.selected.category.name).pipe(
        map(articles => {
          productData.currentTopSales = articles;
          return productData;
        })
      );
    }),
    map(productData => ProductActions.LoadAllByCategorySuccess({productData}))
    )
  );
}
