import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {GET_ALL_ROOT, GetAllRootSuccess} from '../actions/category.actions';
import {CategoryRestService} from '../../shared/service/rest/category.rest.service';

@Injectable()
export class CategoryEffects {

  constructor(private actions: Actions, private categoryRestService: CategoryRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(GET_ALL_ROOT)
    .mergeMap(action => this.categoryRestService.listAllRoots())
    .map(entities => new GetAllRootSuccess(entities));

}
