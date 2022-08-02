import {createEntityAdapter, EntityState} from '@ngrx/entity';
import AdvancedArticle from '../../shared/model/advanced-article.class';
import {createReducer, createSelector, on} from '@ngrx/store';
import {AdvancedProductActions} from '../actions/advanced-product.actions';
import {adminFeatureSelector, AdminState} from '../model/admin-state';

const adapter = createEntityAdapter<AdvancedArticle>();
const defaultState: FromAdminAdvancedProduct.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminAdvancedProduct {

  export interface State extends EntityState<AdvancedArticle> {
  }

  export const reducer = createReducer(
    initialState,
    on(AdvancedProductActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
    on(AdvancedProductActions.CreateSuccess, (state, action) => {
      return adapter.addOne(action.entity, state);
    }),
    on(AdvancedProductActions.UpdateSuccess, (state, action) => {
      return adapter.updateOne({id: action.id, changes: action.changes}, state);
    }),
    on(AdvancedProductActions.DeleteSuccess, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
    on(AdvancedProductActions.UploadNewPictureFail, AdvancedProductActions.RequestFail, (state, action) => {
      console.error(action.error);
      return state;
    }),
  );

  const selectLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.advancedproduct);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(selectLocalState);

}
