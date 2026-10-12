import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import {BrandActions} from '../../../../shared/actions/brand.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'arth-admin-brand-modal',
    templateUrl: './edit-brand.component.html',
    imports: [FormsModule, MatDialogModule]
})
export class EditBrandComponent {
  private store = inject<Store<FromAdminBrand.State>>(Store);
  private dialogRef = inject<MatDialogRef<EditBrandComponent>>(MatDialogRef);

  item: Brand = inject<Brand>(MAT_DIALOG_DATA);

  save(valid: boolean | null) {
    if (valid) {
      this.store.dispatch(BrandActions.Create({entity: this.item}));
      this.dialogRef.close(this.item);
    }
  }
}
