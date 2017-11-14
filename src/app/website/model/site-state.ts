import {createFeatureSelector} from '@ngrx/store';
import CartData from './cart-data.class';
import ProductData from './product-data.class';
import {FromBrand} from '../reducers/brand.reducer';
import {FromCategory} from '../reducers/category.reducer';
import {FromPaypalOrder} from '../reducers/paypal-order.reducer';
import {FromPromoProduct} from '../reducers/promo-product.reducer';
import {FromSlide} from '../reducers/slide.reducer';
import {FromSlideProduct} from '../reducers/slide-product.reducer';

export interface SiteState {
  cartData: CartData;
  rootCategories: FromCategory.State;
  promoArticles: FromPromoProduct.State;
  sliderArticles: FromSlideProduct.State;
  slides: FromSlide.State;
  paypalOrders: FromPaypalOrder.State;
  productData: ProductData;
  brands: FromBrand.State;
}

export const siteFeatureSelector = createFeatureSelector<SiteState>('site');
