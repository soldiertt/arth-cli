import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import Slide from '../../shared/model/slider.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {SlideActions} from '../../shared/actions/slide.actions';

const adapter = createEntityAdapter<Slide>();
const defaultState: FromAdminSlide.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminSlide {

  export interface State extends EntityState<Slide> {}

  export const reducer = createReducer(
    initialState,
    on(SlideActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
    on(SlideActions.CreateSuccess, (state, action) => {
      return adapter.addOne(action.entity, state);
    }),
    on(SlideActions.UpdateSuccess, (state, action) => {
      return adapter.updateOne({id: action.id, changes: action.changes}, state);
    }),
    on(SlideActions.DeleteSuccess, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
    on(SlideActions.UploadNewPictureFail, (state, action) => {
      console.error(action.error);
      return state;
    }),
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.slide);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
