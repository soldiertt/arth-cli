import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
  Create, CREATE, CreateFail, CreateSuccess, Delete, DELETE, DeleteSuccess, GET_ALL, GetAllSuccess
} from '../actions/slide-product.actions';
import {SliderRestService} from '../../shared/service/rest/slider.rest.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class SlideProductEffects {

  constructor(private actions: Actions, private sliderRestService: SliderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.sliderRestService.listAllSlideProducts())
    .map(entities => new GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(CREATE)
    .map((action: Create) => action.entity)
    .mergeMap(entity => {
      return this.sliderRestService.createSlideProduct(entity)
        .map(entity => new CreateSuccess(entity))
        .catch(err => Observable.of(new CreateFail(err.message)));
    });

  @Effect()
  remove: Observable<Action> = this.actions.ofType(DELETE)
    .map((action: Delete) => action.id)
    .mergeMap(id => this.sliderRestService.removeSlideProduct(id).map(() => id))
    .map(id => new DeleteSuccess(id));

}
