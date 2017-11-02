import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
  Create, CREATE, CreateSuccess, Delete, DELETE, DeleteSuccess, GET_ALL,
  GetAllSuccess, UPDATE, Update, UpdateSuccess
} from '../actions/slide.actions';
import Slide from '../../shared/model/slider.class';
import {SliderRestService} from '../../shared/service/rest/slider.rest.service';

@Injectable()
export class SlideEffects {

  constructor(private actions: Actions, private slideRestService: SliderRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.slideRestService.listAll())
    .map(entities => new GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(CREATE)
    .map((action: Create) => action.entity)
    .mergeMap(entity => this.slideRestService.create(entity))
    .map(entity => new CreateSuccess(entity));

  @Effect()
  update: Observable<Action> = this.actions.ofType(UPDATE)
    .mergeMap((action: Update) => this.slideRestService.update(action.id, <Slide>action.changes).map(() => action))
    .map((action: Update) => new UpdateSuccess(action.id, action.changes));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(DELETE)
    .map((action: Delete) => action.id)
    .mergeMap(id => this.slideRestService.remove(id).map(() => id))
    .map(id => new DeleteSuccess(id));

}
