import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import PaypalOrder from '../../shared/model/paypalorder.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {PaypalOrderActions} from '../../shared/actions/paypal-order.actions';

const adapter = createEntityAdapter<PaypalOrder>();
const defaultState: FromAdminPaypalOrder.State  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminPaypalOrder {

  export interface State extends EntityState<PaypalOrder> {}

  export const reducer = createReducer(
    initialState,
    on(PaypalOrderActions.GetAll, (state, action) => {
      return state;
    }),
    on(PaypalOrderActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    })
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.order);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
