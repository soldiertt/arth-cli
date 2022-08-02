import {createAction, props} from '@ngrx/store';
import {OrderArticle} from '../../shared/model/order-article';
import Cart from '../model/cart.class';
import Order from '../../shared/model/order.class';

export namespace CartDataActions {
  /* Wizard */
  const SET_EDIT_MODE = '[CartWizard] Set Edit Mode';
  /* Cart */
  const GET_CART_FROM_SESSION = '[Cart] Get from session';
  const INITIALIZE_CART = '[Cart] Initialize cart';
  const SAVE_CART_IN_SESSION = '[Cart] Save cart in session';
  const CART_SAVED = '[Cart] Cart saved';
  const CART_MOVE_TO_STEP = '[Cart] Cart move to step';
  const ADD_ARTICLE = '[Cart] Add article';
  const REMOVE_ARTICLE = '[Cart] Remove article';
  const REMOVE_ORDER = '[Cart] Remove order';
  const UPDATE_TOP_SALES = '[Cart] Update top sales';
  const UPDATE_TOP_SALES_SUCCESS = '[Cart] Update top sales Success';
  const PAY = '[Cart] PAY';
  const PAY_SUCCESS = '[Cart] PAY Success';

  export const SetEditMode = createAction(
    SET_EDIT_MODE,
    props<{editMode: boolean}>()
  );

  export const GetCartFromSession = createAction(
    GET_CART_FROM_SESSION
  );

  export const InitializeCart = createAction(
    INITIALIZE_CART,
    props<{cart: Cart}>()
  );

  export const SaveCartInSession = createAction(
    SAVE_CART_IN_SESSION,
    props<{cart: Cart}>()
  );

  export const CartSaved = createAction(
    CART_SAVED
  );

  export const CartMoveToStep = createAction(
    CART_MOVE_TO_STEP,
    props<{step: number, country?: string}>()
  );

  export const AddArticle = createAction(
    ADD_ARTICLE,
    props<{article: OrderArticle}>()
  );

  export const RemoveArticle = createAction(
    REMOVE_ARTICLE,
    props<{articleId: string}>()
  );

  export const RemoveOrder = createAction(
    REMOVE_ORDER,
    props<{articleId: string}>()
  );

  export const UpdateTopSales = createAction(
    UPDATE_TOP_SALES,
    props<{orders: Order[]}>()
  );

  export const UpdateTopSalesSuccess = createAction(
    UPDATE_TOP_SALES_SUCCESS
  );

  export const Pay = createAction(
    PAY,
    props<{userId: string, orders: Order[], paymentID: string, payerID: string}>()
  );

  export const PaySuccess = createAction(
    PAY_SUCCESS
  );

}
