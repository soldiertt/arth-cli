import {ActionReducerMap} from '@ngrx/store';
import {productReducer} from './product.reducer';
import {brandReducer} from './brand.reducer';
import {categoryReducer} from './category.reducer';
import {slideReducer} from './slide.reducer';
import {slideProductReducer} from './slide-product.reducer';
import {orderReducer} from './order.reducer';
import {userReducer} from './user.reducer';
import {steelReducer} from './steel.reducer';
import {AdminState} from '../model/admin-state';

export const reducers: ActionReducerMap<AdminState> = {
  brand: brandReducer,
  category: categoryReducer,
  order: orderReducer,
  product: productReducer,
  slide: slideReducer,
  slideproduct: slideProductReducer,
  steel: steelReducer,
  user: userReducer
};
