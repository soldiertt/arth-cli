import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as slideProductActions from '../actions/slide-product.actions';
import * as slideActions from '../actions/slide.actions';
import {SliderRestService} from '../../shared/service/rest/slider.rest.service';

@Injectable()
export class SlideEffects {

  constructor(private actions: Actions, private slideRestService: SliderRestService) {}

  @Effect()
  getAllSlideProducts: Observable<Action> = this.actions.ofType(slideProductActions.GET_ALL)
    .mergeMap(action => this.slideRestService.listAllSlideProducts())
    .map(entities => new slideProductActions.GetAllSuccess(entities));

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(slideActions.GET_ALL)
    .mergeMap(action => this.slideRestService.listAll())
    .map(entities => new slideActions.GetAllSuccess(entities));
}
