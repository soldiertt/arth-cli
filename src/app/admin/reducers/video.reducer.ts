import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import Video from '../../shared/model/video.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {VideoActions} from '../../shared/actions/video.actions';

const adapter = createEntityAdapter<Video>();
const defaultState: FromAdminVideo.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminVideo {

  export interface State extends EntityState<Video> {}

  export const reducer = createReducer(
    initialState,
    on(VideoActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
    on(VideoActions.CreateSuccess, (state, action) => {
      return adapter.addOne(action.entity, state);
    }),
    on(VideoActions.DeleteSuccess, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.video);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
