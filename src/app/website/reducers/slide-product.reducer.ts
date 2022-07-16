import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createSelector} from '@ngrx/store';
import {siteFeatureSelector, SiteState} from '../model/site-state';
import Article from '../../shared/model/article.class';
import {SlideProductActions} from '../../shared/actions/slide-product.actions';

const adapter = createEntityAdapter<Article>();
const defaultState  = {
  ids: [],
  entities: {}
};

const initialState = adapter.getInitialState(defaultState);

export namespace FromSlideProduct {

  export interface State extends EntityState<Article> {}

  export function reducer(state: State = initialState, action: SlideProductActions.Actions) {

    switch (action.type) {
      case SlideProductActions.GET_ALL:
        return state;
      case SlideProductActions.GET_ALL_SUCCESS:
        return adapter.addMany(action.entities, state);
      default:
        return state;
    }
  }

  const getLocalState = createSelector(siteFeatureSelector, (state: SiteState) => state.sliderArticles);

  export const {
    selectAll,
    selectTotal
  } = adapter.getSelectors(getLocalState);

}
