import {createReducer, createSelector, on} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Cart from '../model/cart.class';
import Order from '../../shared/model/order.class';
import CartData from '../model/cart-data.class';
import CartWizard from '../model/cart-wizard.class';
import {CartDataActions} from '../actions/cart-data.actions';

const defaultState: CartData = new CartData();
defaultState.cart = new Cart();
defaultState.wizard = new CartWizard();

export namespace FromCartData {

  export const reducer = createReducer(
    defaultState,
    on(CartDataActions.SetEditMode, (state, action) => {
      return {...state, wizard: {...state.wizard, editMode: action.editMode}};
    }),
    on(CartDataActions.InitializeCart, (state, action) => {
      return {...state, cart: action.cart};
    }),
    on(CartDataActions.CartMoveToStep, (state, action) => {
      let shipping: number = 0;
      const cart = {...state.cart};
      const wizard = {...state.wizard};
      wizard.currentStep = action.step;
      if (action.step === 4 && action.country) {
        if (action.country === 'BE') {
          shipping = 9;
        } else {
          shipping = 15;
        }
      }
      cart.shipping = shipping;
      _updateCart(cart);
      return {...state, cart, wizard};
    }),
    on(CartDataActions.AddArticle, (state, action) => {
      let existing: boolean = false;
      const cart = {...state.cart};
      const orders: Order[] = [];
      cart.orders.forEach(function (order) {
        const newOrder: Order = {...order};
        if (order.article.id === action.article.id) {
          newOrder.count++;
          existing = true;
        }
        orders.push(newOrder);
      });
      cart.orders = orders;
      if (!existing) {
        cart.orders.push(new Order(action.article));
      }
      _updateCart(cart);
      return {...state, cart};
    }),
    on(CartDataActions.RemoveArticle, (state, action) => {
      const orderIndex = state.cart.orders.map(order => order.article.id).indexOf(action.articleId);
      const cart = {...state.cart};
      const orders: Order[] = [];
      cart.orders.forEach(order => {
        orders.push({...order});
      });
      cart.orders = orders;
      if (orderIndex !== -1) {
        cart.orders[orderIndex].count--;
      }
      _updateCart(cart);
      return {...state, cart};
    }),
    on(CartDataActions.RemoveOrder, (state, action) => {
      const orderIndex = state.cart.orders.map(order => order.article.id).indexOf(action.articleId);
      if (orderIndex !== -1) {
        const cart = {...state.cart};
        const wizard = {...state.wizard};
        const orders: Order[] = [];
        cart.orders.forEach(order => {
          orders.push({...order});
        });
        cart.orders = orders;
        cart.orders.splice(orderIndex, 1);
        if (!cart.orders.length) {
          cart.shipping = 0;
          wizard.currentStep = 0;
        }
        _updateCart(cart);
        return {...state, cart, wizard};
      }
      return state;
    }),
    on(CartDataActions.Pay, (state, action) => {
      const cart = {...state.cart};
      cart.orders = [];
      cart.shipping = 0;
      _updateCart(cart);
      return {...state, cart};
    }),
  );

  function _updateCart(cart: Cart): void {

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

  }

  export const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.cartData);

  export const selectCartState = createSelector(selectLocalState, (state: CartData) => state.cart);
  export const selectWizardState = createSelector(selectLocalState, (state: CartData) => state.wizard);

}
