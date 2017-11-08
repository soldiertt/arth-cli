import {ActionReducerMap} from '@ngrx/store';
import {categoryReducer} from './category.reducer';
import {SiteState} from '../model/site-state';
import {promoProductReducer} from './promo-product.reducer';
import {slideProductReducer} from './slide-product.reducer';
import {slideReducer} from './slide.reducer';
import {cartDataReducer} from './cart-data.reducer';

export const reducers: ActionReducerMap<SiteState> = {
  cartData: cartDataReducer,
  rootCategories: categoryReducer,
  promoArticles: promoProductReducer,
  sliderArticles: slideProductReducer,
  slides: slideReducer
};
