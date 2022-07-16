import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs/internal/observable/of';
import Slide from '../model/slider.class';
import {SliderRestService} from '../service/rest/slider.rest.service';
import {SlideActions} from '../actions/slide.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class SlideEffects {

  constructor(private actions$: Actions, private slideRestService: SliderRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.GET_ALL),
    mergeMap(action => this.slideRestService.listAll()),
    map(entities => new SlideActions.GetAllSuccess(entities))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.CREATE),
    map((action: SlideActions.Create) => action.entity),
    mergeMap(entity => this.slideRestService.create(entity)),
    map(entity => new SlideActions.CreateSuccess(entity))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.UPDATE),
    mergeMap((action: SlideActions.Update) => this.slideRestService.update(action.id, <Slide>action.changes).pipe(map(() => action))),
    map((action: SlideActions.Update) => new SlideActions.UpdateSuccess(action.id, action.changes))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.DELETE),
    map((action: SlideActions.Delete) => action.id),
    mergeMap(id => this.slideRestService.remove(id).pipe(map(() => id))),
    map(id => new SlideActions.DeleteSuccess(id))
  ));

  uploadPicture$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.UPLOAD_NEW_PICTURE),
    map((action: SlideActions.UploadNewPicture) => action.formData),
    mergeMap(formData => {
      return this.slideRestService.uploadPicture(formData)
        .pipe(
          map(_ => new SlideActions.UploadNewPictureSuccess()),
          catchError(err => of(new SlideActions.UploadNewPictureFail(err.message)))
        );
    })
  ));
}
