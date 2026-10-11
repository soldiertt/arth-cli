import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import Category from '../../../../shared/model/category.class';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {FromAdminCategory} from '../../../reducers/category.reducer';
import { AsyncPipe } from '@angular/common';
import { EditCategoryComponent } from '../edit/edit-category.component';

@Component({
    templateUrl: './category.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [EditCategoryComponent, AsyncPipe]
})
export class CategoryComponent implements OnInit {
  private store = inject<Store<FromAdminCategory.State>>(Store);


  categories$: Observable<Category[]>;
  edited: Category;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categories$ = this.store.select(FromAdminCategory.selectAll);
    this.store.dispatch(CategoryActions.GetAll());
  }

  newItem() {
    this.edited = new Category();
  }

  editItem(item: Category) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string | undefined) {
    if (id) {
      $event.preventDefault();
      this.store.dispatch(CategoryActions.Delete({id}));
    }
  }

}
