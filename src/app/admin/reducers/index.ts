import {ActionReducerMap} from '@ngrx/store';
import {productReducer} from './product.reducer';
import {brandReducer} from './brand.reducer';
import {categoryReducer} from './category.reducer';
import {slideReducer} from './slide.reducer';
import {slideProductReducer} from './slide-product.reducer';
import {adminReducer} from './admin.reducer';
import {orderReducer} from './order.reducer';
import {userReducer} from './user.reducer';
import {steelReducer} from './steel.reducer';

export const reducers: ActionReducerMap<any> = {
  admin: adminReducer,
  brand: brandReducer,
  category: categoryReducer,
  order: orderReducer,
  product: productReducer,
  slide: slideReducer,
  slideproduct: slideProductReducer,
  steel: steelReducer,
  user: userReducer
};
