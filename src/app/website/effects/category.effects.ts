import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CategoryRestService} from '../../shared/service/rest/category.rest.service';
import {CategoryActions} from '../actions/category.actions';

@Injectable()
export class CategoryEffects {

  constructor(private actions: Actions, private categoryRestService: CategoryRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(CategoryActions.GET_ALL_ROOT)
    .mergeMap(action => this.categoryRestService.listAllRoots())
    .map(entities => new CategoryActions.GetAllRootSuccess(entities));

}
