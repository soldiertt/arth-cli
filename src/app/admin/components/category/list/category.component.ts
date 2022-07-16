import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import Category from '../../../../shared/model/category.class';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {FromAdminCategory} from '../../../reducers/category.reducer';

@Component({
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  edited: Category;

  constructor(private store: Store<FromAdminCategory.State>) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categories$ = this.store.select(FromAdminCategory.selectAll);
    this.store.dispatch(new CategoryActions.GetAll());
  }

  newItem() {
    this.edited = new Category();
  }

  editItem(item: Category) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.store.dispatch(new CategoryActions.Delete(id));
  }

}
