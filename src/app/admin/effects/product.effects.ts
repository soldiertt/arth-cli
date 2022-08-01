import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import Article from '../../shared/model/article.class';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {ProductActions} from '../actions/product.actions';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productRestService: ArticleRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.GetAll),
    mergeMap(action => this.productRestService.listAll()),
    map(entities => ProductActions.GetAllSuccess({entities}))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.Create),
    map((action) => action.entity),
    mergeMap(entity => this.productRestService.create(entity)),
    map(entity => ProductActions.CreateSuccess({entity}))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.Update),
    mergeMap((action) => this.productRestService.update(action.id, <Article>action.changes).pipe(map(() => action))),
    map((action) => ProductActions.UpdateSuccess({id: action.id, changes: action.changes}))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.Delete),
    map((action) => action.id),
    mergeMap(id => this.productRestService.remove(id).pipe(map(() => id))),
    map(id => ProductActions.DeleteSuccess({id}))
  ));

  uploadPicture$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.UploadNewPicture),
    map((action) => action.formData),
    mergeMap(formData => {
      return this.productRestService.uploadPicture(formData)
        .pipe(
          map(_ => ProductActions.UploadNewPictureSuccess()),
          catchError(err => of(ProductActions.UploadNewPictureFail({error: err.message})))
        );
    })
  ));

  exportToCsv$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.ExportToCsv),
    mergeMap((action) => {
      return this.productRestService.exportToCsv(action.category, action.brand, action.steel, action.promo, action.instock)
        .pipe(
          map((csvResponse) => ProductActions.DownloadCsv({csvResponse, contentDispositionHeader: csvResponse.headers.get('Content-Disposition')})),
          catchError(err => of(ProductActions.RequestFail({error: err.message})))
        );
    })
  ));
}
