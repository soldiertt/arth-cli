import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Brand from '../../shared/model/brand.class';
import {BrandActions} from '../../shared/actions/brand.actions';

const adapter = createEntityAdapter<Brand>();
const defaultState: FromBrand.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromBrand {

  export interface State extends EntityState<Brand> {
  }

  export const reducer = createReducer(
    initialState,
    on(BrandActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.brands);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
