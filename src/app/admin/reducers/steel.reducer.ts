import {SteelActions} from '../actions/steel.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import Steel from '../../shared/model/steel.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

const adapter = createEntityAdapter<Steel>();
const defaultState: FromAdminSteel.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminSteel {

  export interface State extends EntityState<Steel> {}

  export const reducer = createReducer(
    initialState,
    on(SteelActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.steel);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
