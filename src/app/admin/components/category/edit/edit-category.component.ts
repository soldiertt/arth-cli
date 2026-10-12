import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import Category from '../../../../shared/model/category.class';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {FromAdminCategory} from '../../../reducers/category.reducer';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'arth-admin-category-modal',
    templateUrl: './edit-category.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, MatDialogModule]
})
export class EditCategoryComponent {
  private store = inject<Store<FromAdminCategory.State>>(Store);
  private dialogRef = inject<MatDialogRef<EditCategoryComponent>>(MatDialogRef);


  item: Category = inject<Category>(MAT_DIALOG_DATA);

  save(valid: boolean | null) {
    if (valid) {
      if (this.item.id) {
        this.store.dispatch(CategoryActions.Update({id: this.item.id, changes: this.item}));
      } else {
        this.store.dispatch(CategoryActions.Create({entity: this.item}));
      }
      this.dialogRef.close(this.item);
    }
  }
}
