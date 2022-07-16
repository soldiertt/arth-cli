import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import Video from '../../shared/model/video.class';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {VideoActions} from '../../shared/actions/video.actions';

const adapter = createEntityAdapter<Video>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminVideo {

  export interface State extends EntityState<Video> {}

  export function reducer(state: State = initialState, action: VideoActions.Actions) {

    switch (action.type) {
      case VideoActions.GET_ALL_SUCCESS:
        return adapter.addMany(action.entities, state);
      case VideoActions.CREATE_SUCCESS:
        return adapter.addOne(action.entity, state);
      case VideoActions.DELETE_SUCCESS:
        return adapter.removeOne(action.id, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.video);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
