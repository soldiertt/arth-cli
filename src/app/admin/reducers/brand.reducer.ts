import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Brand from '../../shared/model/brand.class';
import {createReducer, createSelector, on} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {BrandActions} from '../../shared/actions/brand.actions';

const adapter = createEntityAdapter<Brand>();
const defaultState: FromAdminBrand.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminBrand {

  export interface State extends EntityState<Brand> {}

  export const reducer = createReducer(
    initialState,
    on(BrandActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
    on(BrandActions.CreateSuccess, (state, action) => {
      return adapter.addOne(action.entity, state);
    }),
    on(BrandActions.DeleteSuccess, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.brand);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
