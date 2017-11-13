import {Action} from '@ngrx/store';
import Cart from '../model/cart.class';
import Article from '../../shared/model/article.class';
import Order from '../../shared/model/order.class';

export namespace CartDataActions {
  /* Wizard */
  export const SET_EDIT_MODE = '[CartWizard] Set Edit Mode';
  /* Cart */
  export const GET_CART_FROM_SESSION = '[Cart] Get from session';
  export const INITIALIZE_CART = '[Cart] Initialize cart';
  export const SAVE_CART_IN_SESSION = '[Cart] Save cart in session';
  export const CART_SAVED = '[Cart] Cart saved';
  export const CART_MOVE_TO_STEP = '[Cart] Cart move to step';
  export const ADD_ARTICLE = '[Cart] Add article';
  export const REMOVE_ARTICLE = '[Cart] Remove article';
  export const REMOVE_ORDER = '[Cart] Remove order';
  export const UPDATE_TOP_SALES = '[Cart] Update top sales';
  export const UPDATE_TOP_SALES_SUCCESS = '[Cart] Update top sales Success';
  export const PAY = '[Cart] PAY';
  export const PAY_SUCCESS = '[Cart] PAY Success';

  export class SetEditMode implements Action {
    readonly type = SET_EDIT_MODE;
    constructor(public editMode: boolean) {}
  }

  export class GetCartFromSession implements Action {
    readonly type = GET_CART_FROM_SESSION;
  }

  export class InitializeCart implements Action {
    readonly type = INITIALIZE_CART;

    constructor(public cart: Cart) {
    }
  }

  export class SaveCartInSession implements Action {
    readonly type = SAVE_CART_IN_SESSION;

    constructor(public cart: Cart) {
    }
  }

  export class CartSaved implements Action {
    readonly type = CART_SAVED;
  }

  export class CartMoveToStep implements Action {
    readonly type = CART_MOVE_TO_STEP;

    constructor(public step: number, public country?: string) {
    }
  }

  export class AddArticle implements Action {
    readonly type = ADD_ARTICLE;

    constructor(public article: Article) {
    }
  }

  export class RemoveArticle implements Action {
    readonly type = REMOVE_ARTICLE;

    constructor(public articleId: string) {
    }
  }

  export class RemoveOrder implements Action {
    readonly type = REMOVE_ORDER;

    constructor(public articleId: string) {
    }
  }

  export class UpdateTopSales implements Action {
    readonly type = UPDATE_TOP_SALES;
  }

  export class UpdateTopSalesSuccess implements Action {
    readonly type = UPDATE_TOP_SALES_SUCCESS;
  }

  export class Pay implements Action {
    readonly type = PAY;

    constructor(public userId: string, public orders: Order[], public paymentID: string, public payerID: string) {
    }
  }

  export class PaySuccess implements Action {
    readonly type = PAY_SUCCESS;
  }

  export type Actions
    = SetEditMode
    | GetCartFromSession
    | InitializeCart
    | SaveCartInSession
    | CartSaved
    | CartMoveToStep
    | AddArticle
    | RemoveArticle
    | RemoveOrder
    | UpdateTopSales
    | UpdateTopSalesSuccess
    | Pay
    | PaySuccess;
}
