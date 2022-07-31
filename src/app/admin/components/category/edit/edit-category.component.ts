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
