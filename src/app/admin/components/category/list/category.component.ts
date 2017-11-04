import {Component, OnInit} from '@angular/core';
import * as fromCategory from '../../../reducers/category.reducer';
import * as actions from '../../../actions/category.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import Category from '../../../../shared/model/category.class';

@Component({
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  edited: Category;

  constructor(private store: Store<fromCategory.State>) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categories$ = this.store.select(fromCategory.selectAll);
    this.store.dispatch(new actions.GetAll());
  }

  newItem() {
    this.edited = new Category();
  }

  editItem(item: Category) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.store.dispatch(new actions.Delete(id));
  }

}
