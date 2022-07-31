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
    ofType(BrandActions.GetAll),
    mergeMap(action => this.brandRestService.listAll()),
    map(entities => BrandActions.GetAllSuccess({entities}))
  ));

  loadAllBrands$ = createEffect(() => this.actions$.pipe(
    ofType(BrandActions.GetAllFromProduct),
    mergeMap(action => this.productRestService.findAllBrands()),
    map(entities => BrandActions.GetAllSuccess({entities}))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(BrandActions.Create),
    map((action) => action.entity),
    mergeMap(entity => this.brandRestService.create(entity)),
    map(entity => BrandActions.CreateSuccess({entity}))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(BrandActions.Delete),
    map((action) => action.id),
    mergeMap(id => this.brandRestService.remove(id).pipe(map(() => id))),
    map(id => BrandActions.DeleteSuccess({id}))
  ));
}
