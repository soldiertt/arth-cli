import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Brand from '../../shared/model/brand.class';
import {BrandActions} from '../actions/brand.actions';

const adapter = createEntityAdapter<Brand>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromBrand {

  export interface State extends EntityState<Brand> {
  }

  export function reducer(state: State = initialState, action: BrandActions.Actions) {

    switch (action.type) {
      case BrandActions.GET_ALL_SUCCESS:
        return adapter.addAll(action.entities, state);

      default:
        return state;
    }
  }

  const selectLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.brands);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
