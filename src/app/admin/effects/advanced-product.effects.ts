import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import AdvancedArticle from '../../shared/model/advanced-article.class';
import {AdvancedArticleRestService} from '../../shared/service/rest/advanced-article.rest.service';
import {AdvancedProductActions} from '../actions/advanced-product.actions';

@Injectable()
export class AdvancedProductEffects {

  constructor(private actions$: Actions, private advancedProductRestService: AdvancedArticleRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(AdvancedProductActions.GetAll),
    mergeMap(action => this.advancedProductRestService.listAll()),
    map(entities => AdvancedProductActions.GetAllSuccess({entities}))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(AdvancedProductActions.Create),
    map((action) => action.entity),
    mergeMap(entity => this.advancedProductRestService.create(entity)),
    map(entity => AdvancedProductActions.CreateSuccess({entity}))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(AdvancedProductActions.Update),
    mergeMap((action) => this.advancedProductRestService.update(action.id, <AdvancedArticle>action.changes).pipe(map(() => action))),
    map((action) => AdvancedProductActions.UpdateSuccess({id: action.id, changes: action.changes}))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(AdvancedProductActions.Delete),
    map((action) => action.id),
    mergeMap(id => this.advancedProductRestService.remove(id).pipe(map(() => id))),
    map(id => AdvancedProductActions.DeleteSuccess({id}))
  ));

  uploadPicture$ = createEffect(() => this.actions$.pipe(
    ofType(AdvancedProductActions.UploadNewPicture),
    map((action) => action.formData),
    mergeMap(formData => {
      return this.advancedProductRestService.uploadPicture(formData)
        .pipe(
          map(_ => AdvancedProductActions.UploadNewPictureSuccess()),
          catchError(err => of(AdvancedProductActions.UploadNewPictureFail({error: err.message})))
        );
    })
  ));

}
