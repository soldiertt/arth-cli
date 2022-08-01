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
  csvResponse: undefined,
  filename: undefined
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminProduct {

  export interface State extends EntityState<Article> {
    csvResponse: HttpResponse<Blob> | undefined;
    filename: string | undefined;
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
      const parts: string[] = action.contentDispositionHeader.split(';');
      const filename = parts[1].split('=').pop();
      return {...state, csvResponse: action.csvResponse, filename};
    }),
    on(ProductActions.UploadNewPictureFail, ProductActions.RequestFail, (state, action) => {
      console.error(action.error);
      return state;
    }),
  );

  const selectLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.product);
  export const selectCsvData = createSelector(selectLocalState, (state: State) => ({csvResponse: state.csvResponse, filename: state.filename}));

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
