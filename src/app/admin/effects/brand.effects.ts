import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {BrandRestService} from '../../shared/service/rest/brand.rest.service';
import {
  CREATE, Create, CreateSuccess, DELETE, Delete, DeleteSuccess, GET_ALL,
  GetAllSuccess
} from '../actions/brand.actions';

@Injectable()
export class BrandEffects {

  constructor(private actions: Actions, private brandRestService: BrandRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL)
    .mergeMap(action => this.brandRestService.listAll())
    .map(entities => new GetAllSuccess(entities));

  @Effect()
  create: Observable<Action> = this.actions.ofType(CREATE)
    .map((action: Create) => action.entity)
    .mergeMap(entity => this.brandRestService.create(entity))
    .map(entity => new CreateSuccess(entity));

  @Effect()
  remove: Observable<Action> = this.actions.ofType(DELETE)
    .map((action: Delete) => action.id)
    .mergeMap(id => this.brandRestService.remove(id).map(() => id))
    .map(id => new DeleteSuccess(id));
}
