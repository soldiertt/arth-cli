import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createReducer, createSelector, on} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {ProductActions} from '../actions/product.actions';
import {HttpResponse} from '@angular/common/http';

const adapter = createEntityAdapter<Article>();
const defaultState: FromAdminProduct.State  = {
  ids: [],
  entities: {},
  csvResponse: undefined
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminProduct {

  export interface State extends EntityState<Article> {
    csvResponse: HttpResponse<Blob> | undefined;
  }

  export const reducer = createReducer(
    initialState,
    on(ProductActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
    on(ProductActions.CreateSuccess, (state, action) => {
      return adapter.addOne(action.entity, state);
    }),
    on(ProductActions.UpdateSuccess, (state, action) => {
      return adapter.updateOne({id: action.id, changes: action.changes}, state);
    }),
    on(ProductActions.DeleteSuccess, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
    on(ProductActions.DownloadCsv, (state, action) => {
      return {...state, csvResponse: action.csvResponse};
    }),
    on(ProductActions.UploadNewPictureFail, ProductActions.RequestFail, (state, action) => {
      console.error(action.error);
      return state;
    }),
  );

  const selectLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.product);
  export const selectCsvResponse = createSelector(selectLocalState, (state: State) => state.csvResponse);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
