import {ActionReducerMap} from '@ngrx/store';
import {FromAdminAdvancedProduct} from './advanced-product.reducer';
import {FromAdminBrand} from './brand.reducer';
import {FromAdminCategory} from './category.reducer';
import {AdminState} from '../model/admin-state';
import {FromAdminPaypalOrder} from './paypal-order.reducer';
import {FromAdminProduct} from './product.reducer';
import {FromAdminSlide} from './slide.reducer';
import {FromAdminSlideProduct} from './slide-product.reducer';
import {FromAdminSteel} from './steel.reducer';
import {FromAdminUser} from './user.reducer';
import {FromAdminVideo} from './video.reducer';

export const reducers: ActionReducerMap<AdminState> = {
  advancedproduct: FromAdminAdvancedProduct.reducer,
  brand: FromAdminBrand.reducer,
  category: FromAdminCategory.reducer,
  order: FromAdminPaypalOrder.reducer,
  product: FromAdminProduct.reducer,
  slide: FromAdminSlide.reducer,
  slideproduct: FromAdminSlideProduct.reducer,
  steel: FromAdminSteel.reducer,
  user: FromAdminUser.reducer,
  video: FromAdminVideo.reducer
};
