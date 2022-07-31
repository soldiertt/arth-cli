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
    ofType(SlideActions.GetAll),
    mergeMap(action => this.slideRestService.listAll()),
    map(entities => SlideActions.GetAllSuccess({entities}))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.Create),
    map((action) => action.entity),
    mergeMap(entity => this.slideRestService.create(entity)),
    map(entity => SlideActions.CreateSuccess({entity}))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.Update),
    mergeMap((action) => this.slideRestService.update(action.id, <Slide>action.changes).pipe(map(() => action))),
    map((action) => SlideActions.UpdateSuccess({id: action.id, changes: action.changes}))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.Delete),
    map((action) => action.id),
    mergeMap(id => this.slideRestService.remove(id).pipe(map(() => id))),
    map(id => SlideActions.DeleteSuccess({id}))
  ));

  uploadPicture$ = createEffect(() => this.actions$.pipe(
    ofType(SlideActions.UploadNewPicture),
    map((action) => action.formData),
    mergeMap(formData => {
      return this.slideRestService.uploadPicture(formData)
        .pipe(
          map(_ => SlideActions.UploadNewPictureSuccess()),
          catchError(err => of(SlideActions.UploadNewPictureFail({error: err.message})))
        );
    })
  ));
}
