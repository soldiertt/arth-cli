import {Action} from '@ngrx/store';
import * as slideProductActions from '../actions/slide-product.actions';
import {AdminState} from '../model/admin-state';

export function adminReducer(state: AdminState, action: Action) {

  switch(action.type) {
    case slideProductActions.CREATE_SUCCESS:
      return {...state, slideProductCreated: true};
    case slideProductActions.CREATE_FAIL:
      return {...state, slideProductError: true};
    case 'RESET_SLIDE_PRODUCT_STATUS':
      return {...state, slideProductCreated: false, slideProductError: false};
    default:
      return state;
  }

}
