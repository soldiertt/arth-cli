import {Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import Category from '../../../../shared/model/category.class';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {FromAdminCategory} from '../../../reducers/category.reducer';
import {AsyncPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryComponent} from '../edit/edit-category.component';

@Component({
    templateUrl: './category.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe]
})
export class CategoryComponent implements OnInit {
  private store = inject<Store<FromAdminCategory.State>>(Store);
  private dialog = inject(MatDialog);


  categories$: Observable<Category[]>;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categories$ = this.store.select(FromAdminCategory.selectAll);
    this.store.dispatch(CategoryActions.GetAll());
  }

  newItem() {
    this.dialog.open(EditCategoryComponent, {data: new Category(), width: '800px'});
  }

  editItem($event, item: Category) {
    $event.preventDefault();
    this.dialog.open(EditCategoryComponent, {data: Object.assign({}, item), width: '800px'});
  }

  remove($event, id: string | undefined) {
    if (id) {
      $event.preventDefault();
      this.store.dispatch(CategoryActions.Delete({id}));
    }
  }

}
