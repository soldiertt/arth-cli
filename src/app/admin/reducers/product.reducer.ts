import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createSelector} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {ProductActions} from '../actions/product.actions';
import {HttpResponse} from '@angular/common/http';

const adapter = createEntityAdapter<Article>();
const defaultState  = {
  ids: [],
  entities: {},
  csvResponse: undefined
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminProduct {

  export interface State extends EntityState<Article> {
    csvResponse: HttpResponse<Blob>;
  }

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
      case ProductActions.DOWNLOAD_CSV:
        return {...state, csvResponse: action.csvResponse};
      case ProductActions.UPLOAD_NEW_PICTURE_FAIL:
      case ProductActions.REQUEST_FAIL:
        console.error(action.error);
        return state;
      default:
        return state;
    }
  }

  const selectLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.product);
  export const selectCsvResponse = createSelector(selectLocalState, (state: State) => state.csvResponse);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
