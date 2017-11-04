import {Component, Input} from '@angular/core';
import * as fromCategory from '../../../reducers/category.reducer';
import * as actions from '../../../actions/category.actions';
import {Store} from '@ngrx/store';
import Category from '../../../../shared/model/category.class';

declare var $:any;

@Component({
  selector: 'arth-admin-category-modal',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent {

  @Input() item: Category;

  constructor(private store: Store<fromCategory.State>) { }

  save(valid: boolean) {
    if (valid) {
      if (this.item.id) {
        this.store.dispatch(new actions.Update(this.item.id, this.item));
      } else {
        this.store.dispatch(new actions.Create(this.item));
      }
      $('#categoryModal').modal('hide');
    }
  }
}
