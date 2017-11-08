import * as actions from '../actions/slide.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Slide from '../../shared/model/slider.class';

export const adapter = createEntityAdapter<Slide>();
export interface State extends EntityState<Slide> {}

const defaultState  = {
  ids: [],
  entities: {}
};

export const initialState = adapter.getInitialState(defaultState);

export function slideReducer(state: State = initialState, action: actions.SlideActions) {

  switch (action.type) {
    case actions.GET_ALL:
      return state;
    case actions.GET_ALL_SUCCESS:
      return adapter.addAll(action.entities, state);
    default:
      return state;
  }
}

const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.slides);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors(getLocalState);
