import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import Article from '../../shared/model/article.class';
import {ProductActions} from '../actions/product.actions';

@Injectable()
export class ProductEffects {

  constructor(private actions: Actions, private productRestService: ArticleRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(ProductActions.GET_ALL)
    .mergeMap(action => this.productRestService.listAll())
    .map(entities => new ProductActions.GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(ProductActions.CREATE)
    .map((action: ProductActions.Create) => action.entity)
    .mergeMap(entity => this.productRestService.create(entity))
    .map(entity => new ProductActions.CreateSuccess(entity));

  @Effect()
  update: Observable<Action> = this.actions.ofType(ProductActions.UPDATE)
    .mergeMap((action: ProductActions.Update) => this.productRestService.update(action.id, <Article>action.changes).map(() => action))
    .map((action: ProductActions.Update) => new ProductActions.UpdateSuccess(action.id, action.changes));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(ProductActions.DELETE)
    .map((action: ProductActions.Delete) => action.id)
    .mergeMap(id => this.productRestService.remove(id).map(() => id))
    .map(id => new ProductActions.DeleteSuccess(id));

  @Effect()
  uploadPicture: Observable<Action> = this.actions.ofType(ProductActions.UPLOAD_NEW_PICTURE)
    .map((action: ProductActions.UploadNewPicture) => action.formData)
    .mergeMap(formData => {
      return this.productRestService.uploadPicture(formData)
        .map(_ => new ProductActions.UploadNewPictureSuccess())
        .catch(err => Observable.of(new ProductActions.UploadNewPictureFail(err.message)));
    });
}
