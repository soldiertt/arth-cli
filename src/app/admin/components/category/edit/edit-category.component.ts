import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import Category from '../../../../shared/model/category.class';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {FromAdminCategory} from '../../../reducers/category.reducer';

declare const $: any;

@Component({
  selector: 'arth-admin-category-modal',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent {

  @Input() item: Category;

  constructor(private store: Store<FromAdminCategory.State>) { }

  save(valid: boolean) {
    if (valid) {
      if (this.item.id) {
        this.store.dispatch(new CategoryActions.Update(this.item.id, this.item));
      } else {
        this.store.dispatch(new CategoryActions.Create(this.item));
      }
      $('#categoryModal').modal('hide');
    }
  }
}
