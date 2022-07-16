import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import Slide from '../../shared/model/slider.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {SlideActions} from '../../shared/actions/slide.actions';

const adapter = createEntityAdapter<Slide>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminSlide {

  export interface State extends EntityState<Slide> {}

  export function reducer(state: State = initialState, action: SlideActions.Actions) {

    switch (action.type) {
      case SlideActions.GET_ALL_SUCCESS:
        return adapter.addMany(action.entities, state);
      case SlideActions.CREATE_SUCCESS:
        return adapter.addOne(action.entity, state);
      case SlideActions.UPDATE_SUCCESS:
        return adapter.updateOne({id: action.id, changes: action.changes}, state);
      case SlideActions.DELETE_SUCCESS:
        return adapter.removeOne(action.id, state);
      case SlideActions.UPLOAD_NEW_PICTURE_FAIL:
        console.error(action.error);
        return state;
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.slide);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
