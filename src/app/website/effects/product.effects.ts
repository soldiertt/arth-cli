import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
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

  constructor(private actions: Actions,
              private productRestService: ArticleRestService,
              private categoryRestService: CategoryRestService) {}

  @Effect()
  getAllPromo: Observable<Action> = this.actions.ofType(PromoProductActions.GET_ALL)
    .pipe(
      mergeMap(action => this.productRestService.listAllPromo()),
      map(entities => new PromoProductActions.GetAllSuccess(entities))
    );

  @Effect()
  updateTopSales: Observable<Action> = this.actions.ofType(CartDataActions.UPDATE_TOP_SALES)
    .pipe(
      mergeMap((action: CartDataActions.Pay) => this.productRestService.updateTopSales(action.orders)),
      map(_ => new CartDataActions.UpdateTopSalesSuccess())
    );

  @Effect()
  loadProduct: Observable<Action> = this.actions.ofType(ProductActions.LOAD_ONE)
    .pipe(
      mergeMap((action: ProductActions.LoadOne) => this.productRestService.findById(action.productId)),
      mergeMap(product => this.categoryRestService.findCategory(product.type).map(category => {
        const productItemData: ProductItemData = {product, category};
        return productItemData;
      })),
      mergeMap(productItemData => {
        if (productItemData.category.parent) {
          return this.categoryRestService.findCategory(productItemData.category.parent).map(parentCategory => {
            return {...productItemData, parentCategory};
          })
        } else {
          return Observable.of(productItemData);
        }
      }),
      map(productItemData => new ProductActions.LoadOneSuccess(productItemData))
    );

  @Effect()
  loadAllByBrand: Observable<Action> = this.actions.ofType(ProductActions.LOAD_ALL_BY_BRAND)
    .pipe(
      mergeMap((action: ProductActions.LoadAllByBrand) => this.productRestService.findByBrand(action.brand.marque)),
      map(entities => new ProductActions.LoadAllByBrandSuccess(entities))
    );

  @Effect()
  search: Observable<Action> = this.actions.ofType(ProductActions.SEARCH)
    .pipe(
      mergeMap((action: ProductActions.Search) => this.productRestService.search(action.term)),
      map(entities => new ProductActions.SearchSuccess(entities))
    );

  @Effect()
  loadAllByCategory: Observable<Action> = this.actions.ofType(ProductActions.LOAD_ALL_BY_CATEGORY)
    .pipe(
      mergeMap((action: ProductActions.LoadAllByCategory) => this.categoryRestService.findCategory(action.categoryName).map(category => {
        const productData = new ProductData();
        productData.selected = new ProductItemData();
        productData.selected.category = category;
        return productData;
      })),
      mergeMap(productData => {
        if (productData.selected.category.parent) {
          return this.categoryRestService.findCategory(productData.selected.category.parent).map(parentCategory => {
            productData.selected.parentCategory = parentCategory;
            return productData;
          })
        } else {
          return Observable.of(productData);
        }
      }),
      mergeMap(productData => this.categoryRestService.listSubCategories(productData.selected.category.name).map(subCategories => {
        productData.subCategories = subCategories;
        return productData;
      })),
      mergeMap(productData => {
        if (!productData.subCategories.length) {
          return this.productRestService.findByCategory(productData.selected.category.name).map(products => {
            productData.currentProducts = products;
            return productData;
          });
        } else {
          return Observable.of(productData);
        }
      }),
      mergeMap(productData => {
        return this.productRestService.findTopSalesByCategory(productData.selected.category.name).map(articles => {
          productData.currentTopSales = articles;
          return productData;
        });
      }),
      map(productData => new ProductActions.LoadAllByCategorySuccess(productData))
    );
}
