import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import Slide from '../model/slider.class';
import {SliderRestService} from '../service/rest/slider.rest.service';
import {SlideActions} from '../actions/slide.actions';

@Injectable()
export class SlideEffects {

  constructor(private actions: Actions, private slideRestService: SliderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(SlideActions.GET_ALL)
    .mergeMap(action => this.slideRestService.listAll())
    .map(entities => new SlideActions.GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(SlideActions.CREATE)
    .map((action: SlideActions.Create) => action.entity)
    .mergeMap(entity => this.slideRestService.create(entity))
    .map(entity => new SlideActions.CreateSuccess(entity));

  @Effect()
  update: Observable<Action> = this.actions.ofType(SlideActions.UPDATE)
    .mergeMap((action: SlideActions.Update) => this.slideRestService.update(action.id, <Slide>action.changes).map(() => action))
    .map((action: SlideActions.Update) => new SlideActions.UpdateSuccess(action.id, action.changes));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(SlideActions.DELETE)
    .map((action: SlideActions.Delete) => action.id)
    .mergeMap(id => this.slideRestService.remove(id).map(() => id))
    .map(id => new SlideActions.DeleteSuccess(id));

  @Effect()
  uploadPicture: Observable<Action> = this.actions.ofType(SlideActions.UPLOAD_NEW_PICTURE)
    .map((action: SlideActions.UploadNewPicture) => action.formData)
    .mergeMap(formData => {
      return this.slideRestService.uploadPicture(formData)
        .map(_ => new SlideActions.UploadNewPictureSuccess())
        .catch(err => Observable.of(new SlideActions.UploadNewPictureFail(err.message)));
    });
}
