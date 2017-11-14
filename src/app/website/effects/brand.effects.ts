import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {BrandActions} from '../actions/brand.actions';

@Injectable()
export class BrandEffects {

  constructor(private actions: Actions, private productRestService: ArticleRestService) {}

  @Effect()
  loadAllBrands: Observable<Action> = this.actions.ofType(BrandActions.GET_ALL)
    .mergeMap(action => this.productRestService.findAllBrands())
    .map(entities => new BrandActions.GetAllSuccess(entities));

}
