import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, createSelector, on} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Article from '../../shared/model/article.class';
import {SlideProductActions} from '../../shared/actions/slide-product.actions';

const adapter = createEntityAdapter<Article>();
const defaultState: FromSlideProduct.State  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromSlideProduct {

  export interface State extends EntityState<Article> {}

  export const reducer = createReducer(
    initialState,
    on(SlideProductActions.GetAll, (state, action) => {
      return state;
    }),
    on(SlideProductActions.GetAllSuccess, (state, action) => {
      return adapter.addMany(action.entities, state);
    }),
  );

  const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.sliderArticles);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
