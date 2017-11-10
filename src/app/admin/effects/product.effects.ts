import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {ArticleRestService} from '../../shared/service/rest/article.rest.service';
import {
  Create, CREATE, CreateSuccess, Delete, DELETE, DeleteSuccess, GET_ALL,
  GetAllSuccess, UPDATE, Update, UpdateSuccess, UPLOAD_NEW_PICTURE, UploadNewPicture, UploadNewPictureFail,
  UploadNewPictureSuccess
} from '../actions/product.actions';
import Article from '../../shared/model/article.class';

@Injectable()
export class ProductEffects {

  constructor(private actions: Actions, private productRestService: ArticleRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.productRestService.listAll())
    .map(entities => new GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(CREATE)
    .map((action: Create) => action.entity)
    .mergeMap(entity => this.productRestService.create(entity))
    .map(entity => new CreateSuccess(entity));

  @Effect()
  update: Observable<Action> = this.actions.ofType(UPDATE)
    .mergeMap((action: Update) => this.productRestService.update(action.id, <Article>action.changes).map(() => action))
    .map((action: Update) => new UpdateSuccess(action.id, action.changes));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(DELETE)
    .map((action: Delete) => action.id)
    .mergeMap(id => this.productRestService.remove(id).map(() => id))
    .map(id => new DeleteSuccess(id));

  @Effect()
  uploadPicture: Observable<Action> = this.actions.ofType(UPLOAD_NEW_PICTURE)
    .map((action: UploadNewPicture) => action.formData)
    .mergeMap(formData => {
      return this.productRestService.uploadPicture(formData)
        .map(_ => new UploadNewPictureSuccess())
        .catch(err => Observable.of(new UploadNewPictureFail(err.message)));
    });
}
