import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Brand from '../../shared/model/brand.class';
import {createSelector} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {BrandActions} from '../../shared/actions/brand.actions';

const adapter = createEntityAdapter<Brand>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminBrand {

  export interface State extends EntityState<Brand> {}

  export function reducer(state: State = initialState, action: BrandActions.Actions) {

    switch (action.type) {
      case BrandActions.GET_ALL_SUCCESS:
        return adapter.addAll(action.entities, state);
      case BrandActions.CREATE_SUCCESS:
        return adapter.addOne(action.entity, state);
      case BrandActions.DELETE_SUCCESS:
        return adapter.removeOne(action.id, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.brand);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
