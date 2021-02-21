import {createFeatureSelector} from '@ngrx/store';
import {FromAdminBrand} from '../reducers/brand.reducer';
import {FromAdminCategory} from '../reducers/category.reducer';
import {FromAdminPaypalOrder} from '../reducers/paypal-order.reducer';
import {FromAdminProduct} from '../reducers/product.reducer';
import {FromAdminSlide} from '../reducers/slide.reducer';
import {FromAdminSlideProduct} from '../reducers/slide-product.reducer';
import {FromAdminSteel} from '../reducers/steel.reducer';
import {FromAdminUser} from '../reducers/user.reducer';
import {FromAdminVideo} from '../reducers/video.reducer';

export interface AdminState {
  brand: FromAdminBrand.State;
  category: FromAdminCategory.State;
  order: FromAdminPaypalOrder.State;
  product: FromAdminProduct.State;
  slide: FromAdminSlide.State;
  slideproduct: FromAdminSlideProduct.State;
  video: FromAdminVideo.State;
  steel: FromAdminSteel.State;
  user: FromAdminUser.State;
}

export const adminFeatureSelector = createFeatureSelector<AdminState>('admin');
