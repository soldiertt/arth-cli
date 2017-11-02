import {Component, OnInit} from '@angular/core';
import * as fromCategory from '../../../reducers/category.reducer';
import * as actions from '../../../actions/category.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import Category from '../../../../shared/model/category.class';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  subRouteActive: boolean = false;

  constructor(private store: Store<fromCategory.State>, private router: Router) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.subRouteActive = (event.url.includes('/edit/') || event.url.includes('/add'));
    });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categories$ = this.store.select(fromCategory.selectAll);
    this.store.dispatch(new actions.GetAll());
  }

  remove($event, id: number) {
    $event.preventDefault();
    this.store.dispatch(new actions.Delete(String(id)));
  }

}
