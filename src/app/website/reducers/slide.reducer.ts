import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Slide from '../../shared/model/slider.class';
import {SlideActions} from '../actions/slide.actions';

const adapter = createEntityAdapter<Slide>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromSlide {

  export interface State extends EntityState<Slide> {}

  export function reducer(state: State = initialState, action: SlideActions.Actions) {

    switch (action.type) {
      case SlideActions.GET_ALL:
        return state;
      case SlideActions.GET_ALL_SUCCESS:
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

}
