import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SliderRestService} from '../../shared/service/rest/slider.rest.service';
import {SlideActions} from '../actions/slide.actions';
import {SlideProductActions} from '../actions/slide-product.actions';

@Injectable()
export class SlideEffects {

  constructor(private actions: Actions, private slideRestService: SliderRestService) {}

  @Effect()
  getAllSlideProducts: Observable<Action> = this.actions.ofType(SlideProductActions.GET_ALL)
    .mergeMap(action => this.slideRestService.listAllSlideProducts())
    .map(entities => new SlideProductActions.GetAllSuccess(entities));

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(SlideActions.GET_ALL)
    .mergeMap(action => this.slideRestService.listAll())
    .map(entities => new SlideActions.GetAllSuccess(entities));
}
