import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import PaypalOrder from '../../shared/model/paypalorder.class';
import {PaypalOrderActions} from '../../shared/actions/paypal-order.actions';

const adapter = createEntityAdapter<PaypalOrder>();
const defaultState: FromPaypalOrder.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromPaypalOrder {

  export interface State extends EntityState<PaypalOrder> {}

  export const reducer = createReducer(
    initialState,
    on(PaypalOrderActions.GetAllForUserSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.paypalOrders);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
