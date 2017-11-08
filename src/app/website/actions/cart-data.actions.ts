import {Action} from '@ngrx/store';
import Cart from '../model/cart.class';
import Article from '../../shared/model/article.class';

/* Wizard */
export const ADDRESS_COMPLETED = '[CartWizard] Address completed';
export const ADDRESS_INCOMPLETE = '[CartWizard] Address incomplete';
/* Cart */
export const INIT_FROM_SESSION = '[Cart] Init from session';
export const CART_MOVE_TO_STEP = '[Cart] Cart move to step';
export const ADD_ARTICLE = '[Cart] Add article';
export const REMOVE_ARTICLE = '[Cart] Remove article';
export const REMOVE_ORDER = '[Cart] Remove order';
export const EMPTY_CART = '[Cart] Empty cart';

export class AddressCompleted implements Action {
  readonly type = ADDRESS_COMPLETED;
}

export class AddressIncomplete implements Action {
  readonly type = ADDRESS_INCOMPLETE;
}

export class InitFromSession implements Action {
  readonly type = INIT_FROM_SESSION;
  constructor(public cart: Cart) {}
}

export class CartMoveToStep implements Action {
  readonly type = CART_MOVE_TO_STEP;
  constructor(public step: number, public country: string) {}
}

export class AddArticle implements Action {
  readonly type = ADD_ARTICLE;
  constructor(public article: Article) {}
}

export class RemoveArticle implements Action {
  readonly type = REMOVE_ARTICLE;
  constructor(public articleId: string) {}
}

export class RemoveOrder implements Action {
  readonly type = REMOVE_ORDER;
  constructor(public articleId: string) {}
}

export class EmptyCart implements Action {
  readonly type = EMPTY_CART;
}

export type CartDataActions
  = AddressCompleted
  | AddressIncomplete
  | InitFromSession
  | CartMoveToStep
  | AddArticle
  | RemoveArticle
  | RemoveOrder
  | EmptyCart;
