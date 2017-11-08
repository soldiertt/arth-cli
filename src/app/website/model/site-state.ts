import {createFeatureSelector} from '@ngrx/store';
import * as fromCategory from '../reducers/category.reducer'
import * as fromPromoProduct from '../reducers/promo-product.reducer'
import * as fromSlideProduct from '../reducers/slide-product.reducer'
import * as fromSlide from '../reducers/slide.reducer'
import CartData from './cart-data.class';

export interface SiteState {
  cartData: CartData;
  rootCategories: fromCategory.State;
  promoArticles: fromPromoProduct.State;
  sliderArticles: fromSlideProduct.State;
  slides: fromSlide.State;
}

export const siteFeatureSelector = createFeatureSelector<SiteState>('site');
