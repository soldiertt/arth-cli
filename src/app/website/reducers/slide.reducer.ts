import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Slide from '../../shared/model/slider.class';
import {SlideActions} from '../../shared/actions/slide.actions';

const adapter = createEntityAdapter<Slide>();
const defaultState: FromSlide.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromSlide {

  export interface State extends EntityState<Slide> {}

  export const reducer = createReducer(
    initialState,
    on(SlideActions.GetAll, (state, action) => {
      return state;
    }),
    on(SlideActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.slides);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
