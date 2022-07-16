import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {SliderRestService} from '../service/rest/slider.rest.service';
import {SlideProductActions} from '../actions/slide-product.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class SlideProductEffects {

  constructor(private actions: Actions, private sliderRestService: SliderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(SlideProductActions.GET_ALL)
    .pipe(
      mergeMap(action => this.sliderRestService.listAllSlideProducts()),
      map(entities => new SlideProductActions.GetAllSuccess(entities))
    );

  @Effect()
  create: Observable<Action> = this.actions.ofType(SlideProductActions.CREATE)
    .pipe(
      map((action: SlideProductActions.Create) => action.entity),
      mergeMap(entity => {
        return this.sliderRestService.createSlideProduct(entity)
          .pipe(
            map(spEntity => new SlideProductActions.CreateSuccess(spEntity)),
            catchError(err => of(new SlideProductActions.CreateFail(err.message)))
          );
      })
    );

  @Effect()
  remove: Observable<Action> = this.actions.ofType(SlideProductActions.DELETE)
    .pipe(
      map((action: SlideProductActions.Delete) => action.id),
      mergeMap(id => this.sliderRestService.removeSlideProduct(id).map(() => id)),
      map(id => new SlideProductActions.DeleteSuccess(id))
    );

}
