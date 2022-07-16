import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import Article from '../../shared/model/article.class';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {ProductActions} from '../actions/product.actions';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productRestService: ArticleRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.GET_ALL),
    mergeMap(action => this.productRestService.listAll()),
    map(entities => new ProductActions.GetAllSuccess(entities))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.CREATE),
    map((action: ProductActions.Create) => action.entity),
    mergeMap(entity => this.productRestService.create(entity)),
    map(entity => new ProductActions.CreateSuccess(entity))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.UPDATE),
    mergeMap((action: ProductActions.Update) => this.productRestService.update(action.id, <Article>action.changes).pipe(map(() => action))),
    map((action: ProductActions.Update) => new ProductActions.UpdateSuccess(action.id, action.changes))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.DELETE),
    map((action: ProductActions.Delete) => action.id),
    mergeMap(id => this.productRestService.remove(id).pipe(map(() => id))),
    map(id => new ProductActions.DeleteSuccess(id))
  ));

  uploadPicture$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.UPLOAD_NEW_PICTURE),
    map((action: ProductActions.UploadNewPicture) => action.formData),
    mergeMap(formData => {
      return this.productRestService.uploadPicture(formData)
        .pipe(
          map(_ => new ProductActions.UploadNewPictureSuccess()),
          catchError(err => of(new ProductActions.UploadNewPictureFail(err.message)))
        );
    })
  ));

  exportToCsv$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.EXPORT_TO_CSV),
    mergeMap((action: ProductActions.ExportToCsv) => {
      return this.productRestService.exportToCsv(action.category, action.brand, action.steel, action.promo, action.instock)
        .pipe(
          map(csvResponse => new ProductActions.DownloadCsv(csvResponse)),
          catchError(err => of(new ProductActions.RequestFail(err.message)))
        );
    })
  ));
}
