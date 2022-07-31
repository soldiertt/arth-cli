import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs/internal/observable/of';
import {SliderRestService} from '../service/rest/slider.rest.service';
import {SlideProductActions} from '../actions/slide-product.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class SlideProductEffects {

  constructor(private actions$: Actions, private sliderRestService: SliderRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(SlideProductActions.GetAll),
    mergeMap(action => this.sliderRestService.listAllSlideProducts()),
    map(entities => SlideProductActions.GetAllSuccess({entities}))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(SlideProductActions.Create),
    map((action) => action.entity),
    mergeMap(entity => {
      return this.sliderRestService.createSlideProduct(entity)
        .pipe(
          map(spEntity => SlideProductActions.CreateSuccess({entity: spEntity})),
          catchError(err => of(SlideProductActions.CreateFail({error: err.message})))
        );
    })
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(SlideProductActions.Delete),
    map((action) => action.id),
    mergeMap(id => this.sliderRestService.removeSlideProduct(id).pipe(map(() => id))),
    map(id => SlideProductActions.DeleteSuccess({id}))
  ));

}
