import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {BrandRestService} from '../service/rest/brand.rest.service';
import {BrandActions} from '../actions/brand.actions';
import {ArticleRestService} from '../service/rest/article.rest.service';

@Injectable()
export class BrandEffects {

  constructor(private actions$: Actions,
              private brandRestService: BrandRestService,
              private productRestService: ArticleRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(BrandActions.GET_ALL),
    mergeMap(action => this.brandRestService.listAll()),
    map(entities => new BrandActions.GetAllSuccess(entities))
  ));

  loadAllBrands$ = createEffect(() => this.actions$.pipe(
    ofType(BrandActions.GET_ALL_FROM_PRODUCT),
    mergeMap(action => this.productRestService.findAllBrands()),
    map(entities => new BrandActions.GetAllSuccess(entities))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(BrandActions.CREATE),
    map((action: BrandActions.Create) => action.entity),
    mergeMap(entity => this.brandRestService.create(entity)),
    map(entity => new BrandActions.CreateSuccess(entity))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(BrandActions.DELETE),
    map((action: BrandActions.Delete) => action.id),
    mergeMap(id => this.brandRestService.remove(id).pipe(map(() => id))),
    map(id => new BrandActions.DeleteSuccess(id))
  ));
}
