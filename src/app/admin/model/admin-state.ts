import * as fromBrand from '../reducers/brand.reducer';
import * as fromCategory from '../reducers/category.reducer';
import * as fromProduct from '../reducers/product.reducer';
import * as fromSlide from '../reducers/slide.reducer';
import * as fromSlideProduct from '../reducers/slide-product.reducer';
import * as fromOrder from '../reducers/order.reducer';
import * as fromUser from '../reducers/user.reducer';
import {createFeatureSelector} from '@ngrx/store';

export interface AdminState {
  brand: fromBrand.State,
  category: fromCategory.State,
  order: fromOrder.State,
  product: fromProduct.State,
  slide: fromSlide.State,
  slideproduct: fromSlideProduct.State,
  user: fromUser.State
}

export const adminFeatureSelector = createFeatureSelector<AdminState>('admin');
