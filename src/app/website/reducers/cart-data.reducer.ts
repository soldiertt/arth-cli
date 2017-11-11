import * as actions from '../actions/cart-data.actions';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Cart from '../model/cart.class';
import Order from '../../shared/model/order.class';
import CartData from '../model/cart-data.class';
import CartWizard from '../model/cart-wizard.class';

const defaultState: CartData = new CartData();
defaultState.cart = new Cart();
defaultState.wizard = new CartWizard();

export function cartDataReducer(state: CartData = defaultState, action: actions.CartDataActions) {

  let newState: CartData;
  let orderIndex: number;

  switch (action.type) {
    case actions.ADDRESS_COMPLETED:
      return {...state, wizard: {...state.wizard, addressCompleted: true}};

    case actions.ADDRESS_INCOMPLETE:
      return {...state, wizard: {...state.wizard, addressCompleted: false}};

    case actions.INITIALIZE_CART:
      return {...state, cart: action.cart};

    case actions.CART_MOVE_TO_STEP: {
      let shipping: number = 0;
      newState = {...state, wizard: {...state.wizard, currentStep: action.step}};
      if (action.step === 4 && action.country) {
        if (action.country === 'BE') {
          shipping = 9;
        } else {
          shipping = 15;
        }
      }
      newState.cart.shipping = shipping;
      return this._updateCart(newState);
    }

    case actions.ADD_ARTICLE: {
      let existing: boolean = false;
      newState = {...state};
      newState.cart.orders.forEach(function (order) {
        if (order.article.id === action.article.id) {
          order.count++;
          existing = true;
        }
      });
      if (!existing) {
        newState.cart.orders.push(new Order(action.article));
      }
      return this._updateCart(newState);
    }

    case actions.REMOVE_ARTICLE: {
      orderIndex = state.cart.orders.map(order => order.article.id).indexOf(action.articleId);
      newState = {...state};
      if (orderIndex !== -1) {
        newState.cart.orders[orderIndex].count--;
      }
      return this._updateCart(newState);
    }

    case actions.REMOVE_ORDER: {
      orderIndex = state.cart.orders.map(order => order.article.id).indexOf(action.articleId);
      if (orderIndex != -1) {
        newState = {...state};
        newState.cart.orders.splice(orderIndex, 1);
        if (!newState.cart.orders.length) {
          newState.cart.shipping = 0;
          newState.wizard.currentStep = 0;
        }
        return this._updateCart(newState.cart);
      }
      return state;
    }

    case actions.PAY: {
      newState = {...state, cart: {...state.cart, orders: [], shipping: 0}};
      return this._updateCart(newState);
    }

    default:
      return state;
  }
}

function _updateCart(newState:CartData) {

  const cart = newState.cart;

  cart.totalAmount = 0;
  cart.subtotalAmount = 0;
  cart.totalPromoAmount = 0;
  cart.promoPercentage = 0;
  cart.promoAmount = 0;
  cart.totalCount = 0;

  cart.orders.forEach(order => {
    cart.totalCount += order.count;
    cart.subtotalAmount += (order.count * order.article.price);
    if (!order.article.promo) {
      cart.totalPromoAmount += (order.count * order.article.price);
    }
  });

  // Compute promotion
  if (cart.totalPromoAmount >= 2000) {
    cart.promoPercentage = 0.4;
  } else if (cart.totalPromoAmount >= 800) {
    cart.promoPercentage = 0.2;
  } else if (cart.totalPromoAmount >= 400) {
    cart.promoPercentage = 0.1;
  }
  cart.promoAmount = cart.totalPromoAmount * cart.promoPercentage;

  // Compute total
  cart.totalAmount = cart.subtotalAmount - cart.promoAmount + cart.shipping;

  return newState;
}

export const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.cartData);

export const selectCartState = createSelector(selectLocalState, (state: CartData) => state.cart);
export const selectWizardState = createSelector(selectLocalState, (state: CartData) => state.wizard);
