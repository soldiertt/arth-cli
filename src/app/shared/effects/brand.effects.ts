import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {BrandRestService} from '../service/rest/brand.rest.service';
import {BrandActions} from '../actions/brand.actions';
import {ArticleRestService} from '../service/rest/article.rest.service';

@Injectable()
export class BrandEffects {

  constructor(private actions: Actions,
              private brandRestService: BrandRestService,
              private productRestService: ArticleRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(BrandActions.GET_ALL)
    .mergeMap(action => this.brandRestService.listAll())
    .map(entities => new BrandActions.GetAllSuccess(entities));

  @Effect()
  loadAllBrands: Observable<Action> = this.actions.ofType(BrandActions.GET_ALL_FROM_PRODUCT)
    .mergeMap(action => this.productRestService.findAllBrands())
    .map(entities => new BrandActions.GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(BrandActions.CREATE)
    .map((action: BrandActions.Create) => action.entity)
    .mergeMap(entity => this.brandRestService.create(entity))
    .map(entity => new BrandActions.CreateSuccess(entity));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(BrandActions.DELETE)
    .map((action: BrandActions.Delete) => action.id)
    .mergeMap(id => this.brandRestService.remove(id).map(() => id))
    .map(id => new BrandActions.DeleteSuccess(id));
}
