import * as actions from '../actions/paypal-order.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import PaypalOrder from '../../shared/model/paypalorder.class';

export const adapter = createEntityAdapter<PaypalOrder>();
export interface State extends EntityState<PaypalOrder> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export function paypalOrderReducer(state: State = initialState, action: actions.PaypalOrderActions) {

  switch (action.type) {
    case actions.GET_ALL_FOR_USER_SUCCESS:
      return adapter.addAll(action.entities, state);
    default:
      return state;
  }
}

const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.paypalOrders);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(selectLocalState);

