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
    ofType(CategoryActions.GetAll),
    mergeMap(action => this.categoryRestService.listAll()),
    map(entities => CategoryActions.GetAllSuccess({entities}))
  ));

  getAllRoot$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.GetAllRoot),
    mergeMap(action => this.categoryRestService.listAllRoots()),
    map(entities => CategoryActions.GetAllRootSuccess({entities}))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.Create),
    map((action) => action.entity),
    mergeMap(entity => this.categoryRestService.create(entity)),
    map(entity => CategoryActions.CreateSuccess({entity}))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.Update),
    mergeMap((action) => this.categoryRestService.update(action.id, <Category>action.changes).pipe(
      map(() => action))
    ),
    map((action) => CategoryActions.UpdateSuccess({id: action.id, changes: action.changes}))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.Delete),
    map((action) => action.id),
    mergeMap(id => this.categoryRestService.remove(id).pipe(map(() => id))),
    map(id => CategoryActions.DeleteSuccess({id}))
  ));

}
