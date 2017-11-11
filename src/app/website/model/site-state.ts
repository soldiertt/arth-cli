import {createFeatureSelector} from '@ngrx/store';
import * as fromCategory from '../reducers/category.reducer';
import * as fromPromoProduct from '../reducers/promo-product.reducer';
import * as fromSlideProduct from '../reducers/slide-product.reducer';
import * as fromSlide from '../reducers/slide.reducer';
import * as fromPaypalOrder from '../reducers/paypal-order.reducer';
import CartData from './cart-data.class';
import ProductData from './product-data.class';

export interface SiteState {
  cartData: CartData;
  rootCategories: fromCategory.State;
  promoArticles: fromPromoProduct.State;
  sliderArticles: fromSlideProduct.State;
  slides: fromSlide.State;
  paypalOrders: fromPaypalOrder.State;
  productData: ProductData;
}

export const siteFeatureSelector = createFeatureSelector<SiteState>('site');
