import {ActionReducerMap} from '@ngrx/store';
import {productReducer} from './product.reducer';
import {brandReducer} from './brand.reducer';
import {categoryReducer} from './category.reducer';
import {slideReducer} from './slide.reducer';

export const reducers: ActionReducerMap<any> = {
  product: productReducer,
  brand: brandReducer,
  category: categoryReducer,
  slide: slideReducer
}
