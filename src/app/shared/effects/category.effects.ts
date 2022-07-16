import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {CategoryRestService} from '../service/rest/category.rest.service';
import Category from '../model/category.class';
import {CategoryActions} from '../actions/category.actions';

@Injectable()
export class CategoryEffects {

  constructor(private actions$: Actions, private categoryRestService: CategoryRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.GET_ALL),
    mergeMap(action => this.categoryRestService.listAll()),
    map(entities => new CategoryActions.GetAllSuccess(entities))
  ));

  getAllRoot$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.GET_ALL_ROOT),
    mergeMap(action => this.categoryRestService.listAllRoots()),
    map(entities => new CategoryActions.GetAllRootSuccess(entities))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.CREATE),
    map((action: CategoryActions.Create) => action.entity),
    mergeMap(entity => this.categoryRestService.create(entity)),
    map(entity => new CategoryActions.CreateSuccess(entity))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.UPDATE),
    mergeMap((action: CategoryActions.Update) => this.categoryRestService.update(action.id, <Category>action.changes).pipe(
      map(() => action))
    ),
    map((action: CategoryActions.Update) => new CategoryActions.UpdateSuccess(action.id, action.changes))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.DELETE),
    map((action: CategoryActions.Delete) => action.id),
    mergeMap(id => this.categoryRestService.remove(id).pipe(map(() => id))),
    map(id => new CategoryActions.DeleteSuccess(id))
  ));

}
