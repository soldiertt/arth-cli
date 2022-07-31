import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createReducer, createSelector, on} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {SlideProductActions} from '../../shared/actions/slide-product.actions';

const adapter = createEntityAdapter<Article>();
const defaultState: FromAdminSlideProduct.State  = {
  ids: [],
  entities: {},
  created: false
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromAdminSlideProduct {

  export interface State extends EntityState<Article> {
    created: boolean;
    error?: string;
  }

  export const reducer = createReducer(
    initialState,
    on(SlideProductActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
    on(SlideProductActions.Create, (state, action) => {
      return {...state, created: false, error: undefined};
    }),
    on(SlideProductActions.CreateSuccess, (state, action) => {
      const newState = {...state, created: true};
      return adapter.addOne(action.entity, newState);
    }),
    on(SlideProductActions.CreateFail, (state, action) => {
      return {...state, error: action.error};
    }),
    on(SlideProductActions.DeleteSuccess, (state, action) => {
      return adapter.removeOne(action.id, state);
    }),
  );

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.slideproduct);

  export const selectCreated = createSelector(getLocalState, (state: State) => state.created);
  export const selectError = createSelector(getLocalState, (state: State) => state.error);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
