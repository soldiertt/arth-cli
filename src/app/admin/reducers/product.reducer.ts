import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createSelector} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {ProductActions} from '../actions/product.actions';

const adapter = createEntityAdapter<Article>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminProduct {

  export interface State extends EntityState<Article> {}

  export function reducer(state: State = initialState, action: ProductActions.Actions) {

    switch (action.type) {
      case ProductActions.GET_ALL_SUCCESS:
        return adapter.addAll(action.entities, state);
      case ProductActions.CREATE_SUCCESS:
        return adapter.addOne(action.entity, state);
      case ProductActions.UPDATE_SUCCESS:
        return adapter.updateOne({id: action.id, changes: action.changes}, state);
      case ProductActions.DELETE_SUCCESS:
        return adapter.removeOne(action.id, state);
      case ProductActions.UPLOAD_NEW_PICTURE_FAIL:
        console.error(action.error);
        return state;
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.product);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
