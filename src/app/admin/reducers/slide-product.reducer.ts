import {createEntityAdapter, EntityState} from '@ngrx/entity';
import Article from '../../shared/model/article.class';
import {createSelector} from '@ngrx/store';
import {adminFeatureSelector, AdminState} from '../model/admin-state';
import {SlideProductActions} from '../../shared/actions/slide-product.actions';

const adapter = createEntityAdapter<Article>();
const defaultState  = {
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

  export function reducer(state: State = initialState, action: SlideProductActions.Actions) {

    switch (action.type) {
      case SlideProductActions.GET_ALL_SUCCESS:
        return adapter.addMany(action.entities, state);
      case SlideProductActions.CREATE:
        return {...state, created: false, error: undefined};
      case SlideProductActions.CREATE_SUCCESS:
        const newState = {...state, created: true};
        return adapter.addOne(action.entity, newState);
      case SlideProductActions.CREATE_FAIL:
        return {...state, error: action.error};
      case SlideProductActions.DELETE_SUCCESS:
        return adapter.removeOne(action.id, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(adminFeatureSelector, (state: AdminState) => state.slideproduct);

  export const selectCreated = createSelector(getLocalState, (state: State) => state.created);
  export const selectError = createSelector(getLocalState, (state: State) => state.error);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
