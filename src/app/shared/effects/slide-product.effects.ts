import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SliderRestService} from '../service/rest/slider.rest.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {SlideProductActions} from '../actions/slide-product.actions';

@Injectable()
export class SlideProductEffects {

  constructor(private actions: Actions, private sliderRestService: SliderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(SlideProductActions.GET_ALL)
    .mergeMap(action => this.sliderRestService.listAllSlideProducts())
    .map(entities => new SlideProductActions.GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(SlideProductActions.CREATE)
    .map((action: SlideProductActions.Create) => action.entity)
    .mergeMap(entity => {
      return this.sliderRestService.createSlideProduct(entity)
        .map(entity => new SlideProductActions.CreateSuccess(entity))
        .catch(err => Observable.of(new SlideProductActions.CreateFail(err.message)));
    });

  @Effect()
  remove: Observable<Action> = this.actions.ofType(SlideProductActions.DELETE)
    .map((action: SlideProductActions.Delete) => action.id)
    .mergeMap(id => this.sliderRestService.removeSlideProduct(id).map(() => id))
    .map(id => new SlideProductActions.DeleteSuccess(id));

}
