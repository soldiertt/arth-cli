import {ActionReducerMap} from '@ngrx/store';
import {FromCategory} from './category.reducer';
import {SiteState} from '../model/site-state';
import {FromBrand} from './brand.reducer';
import {FromCartData} from './cart-data.reducer';
import {FromPaypalOrder} from './paypal-order.reducer';
import {FromProduct} from './product.reducer';
import {FromPromoProduct} from './promo-product.reducer';
import {FromSlide} from './slide.reducer';
import {FromSlideProduct} from './slide-product.reducer';

export const reducers: ActionReducerMap<SiteState> = {
  cartData: FromCartData.reducer,
  rootCategories: FromCategory.reducer,
  promoArticles: FromPromoProduct.reducer,
  sliderArticles: FromSlideProduct.reducer,
  slides: FromSlide.reducer,
  paypalOrders: FromPaypalOrder.reducer,
  productData: FromProduct.reducer,
  brands: FromBrand.reducer
};
