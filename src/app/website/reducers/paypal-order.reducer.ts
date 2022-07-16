import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import PaypalOrder from '../../shared/model/paypalorder.class';
import {PaypalOrderActions} from '../../shared/actions/paypal-order.actions';

const adapter = createEntityAdapter<PaypalOrder>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromPaypalOrder {

  export interface State extends EntityState<PaypalOrder> {}

  export function reducer(state: State = initialState, action: PaypalOrderActions.Actions) {

    switch (action.type) {
      case PaypalOrderActions.GET_ALL_FOR_USER_SUCCESS:
        return adapter.addMany(action.entities, state);
      default:
        return state;
    }
  }

  const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.paypalOrders);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
