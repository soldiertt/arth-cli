import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CategoryRestService} from '../service/rest/category.rest.service';
import Category from '../model/category.class';
import {CategoryActions} from '../actions/category.actions';

@Injectable()
export class CategoryEffects {

  constructor(private actions: Actions, private categoryRestService: CategoryRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(CategoryActions.GET_ALL)
    .mergeMap(action => this.categoryRestService.listAll())
    .map(entities => new CategoryActions.GetAllSuccess(entities));

  @Effect()
  getAllRoot: Observable<Action> = this.actions.ofType(CategoryActions.GET_ALL_ROOT)
    .mergeMap(action => this.categoryRestService.listAllRoots())
    .map(entities => new CategoryActions.GetAllRootSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(CategoryActions.CREATE)
    .map((action: CategoryActions.Create) => action.entity)
    .mergeMap(entity => this.categoryRestService.create(entity))
    .map(entity => new CategoryActions.CreateSuccess(entity));

  @Effect()
  update: Observable<Action> = this.actions.ofType(CategoryActions.UPDATE)
    .mergeMap((action: CategoryActions.Update) => this.categoryRestService.update(action.id, <Category>action.changes).map(() => action))
    .map((action: CategoryActions.Update) => new CategoryActions.UpdateSuccess(action.id, action.changes));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(CategoryActions.DELETE)
    .map((action: CategoryActions.Delete) => action.id)
    .mergeMap(id => this.categoryRestService.remove(id).map(() => id))
    .map(id => new CategoryActions.DeleteSuccess(id));

}
