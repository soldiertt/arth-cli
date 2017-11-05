import * as actions from '../actions/order.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import PaypalOrder from '../../shared/model/paypalorder.class';

export const adapter = createEntityAdapter<PaypalOrder>();
export interface State extends EntityState<PaypalOrder> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState: State = adapter.getInitialState(defaultState);

export function orderReducer(state: State = initialState, action: actions.OrderActions) {

  switch (action.type) {
    case actions.GET_ALL:
      return state;
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    default:
      return state;
  }
}

export const getOrderState = createFeatureSelector<State>('order');

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getOrderState);
