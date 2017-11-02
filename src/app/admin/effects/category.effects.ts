import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
  Create, CREATE, CreateSuccess, Delete, DELETE, DeleteSuccess, GET_ALL,
  GetAllSuccess, UPDATE, Update, UpdateSuccess
} from '../actions/category.actions';
import {CategoryRestService} from '../../shared/service/rest/category.rest.service';
import Category from '../../shared/model/category.class';

@Injectable()
export class CategoryEffects {

  constructor(private actions: Actions, private categoryRestService: CategoryRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.categoryRestService.listAll())
    .map(entities => new GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(CREATE)
    .map((action: Create) => action.entity)
    .mergeMap(entity => this.categoryRestService.create(entity))
    .map(entity => new CreateSuccess(entity));

  @Effect()
  update: Observable<Action> = this.actions.ofType(UPDATE)
    .mergeMap((action: Update) => this.categoryRestService.update(action.id, <Category>action.changes).map(() => action))
    .map((action: Update) => new UpdateSuccess(action.id, action.changes));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(DELETE)
    .map((action: Delete) => action.id)
    .mergeMap(id => this.categoryRestService.remove(id).map(() => id))
    .map(id => new DeleteSuccess(id));

}
