import * as actions from '../actions/steel.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import Steel from '../../shared/model/steel.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

const adapter = createEntityAdapter<Steel>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminSteel {

  export interface State extends EntityState<Steel> {}

  export function reducer(state: State = initialState, action: actions.SteelActions) {

    switch (action.type) {
      case actions.GET_ALL_SUCCESS:
        return adapter.addAll(action.entities, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.steel);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
