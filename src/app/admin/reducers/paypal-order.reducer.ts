import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import PaypalOrder from '../../shared/model/paypalorder.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {PaypalOrderActions} from '../../shared/actions/paypal-order.actions';

const adapter = createEntityAdapter<PaypalOrder>();
const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminPaypalOrder {

  export interface State extends EntityState<PaypalOrder> {}

  export function reducer(state: State = initialState, action: PaypalOrderActions.Actions) {

    switch (action.type) {
      case PaypalOrderActions.GET_ALL:
        return state;
      case PaypalOrderActions.GET_ALL_SUCCESS:
        return adapter.addAll(action.entities, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.order);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
