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
    ofType(SlideProductActions.GET_ALL),
    mergeMap(action => this.sliderRestService.listAllSlideProducts()),
    map(entities => new SlideProductActions.GetAllSuccess(entities))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(SlideProductActions.CREATE),
    map((action: SlideProductActions.Create) => action.entity),
    mergeMap(entity => {
      return this.sliderRestService.createSlideProduct(entity)
        .pipe(
          map(spEntity => new SlideProductActions.CreateSuccess(spEntity)),
          catchError(err => of(new SlideProductActions.CreateFail(err.message)))
        );
    })
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(SlideProductActions.DELETE),
    map((action: SlideProductActions.Delete) => action.id),
    mergeMap(id => this.sliderRestService.removeSlideProduct(id).pipe(map(() => id))),
    map(id => new SlideProductActions.DeleteSuccess(id))
  ));

}
