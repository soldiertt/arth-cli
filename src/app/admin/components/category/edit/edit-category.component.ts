import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import Category from '../../../../shared/model/category.class';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {FromAdminCategory} from '../../../reducers/category.reducer';
import { FormsModule } from '@angular/forms';


declare const $: any;

@Component({
    selector: 'arth-admin-category-modal',
    templateUrl: './edit-category.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class EditCategoryComponent {
  private store = inject<Store<FromAdminCategory.State>>(Store);


  @Input() item: Category;

  save(valid: boolean | null) {
    if (valid) {
      if (this.item.id) {
        this.store.dispatch(CategoryActions.Update({id: this.item.id, changes: this.item}));
      } else {
        this.store.dispatch(CategoryActions.Create({entity: this.item}));
      }
      $('#categoryModal').modal('hide');
    }
  }
}
