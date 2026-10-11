import { Component, Input, inject } from '@angular/core';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import {BrandActions} from '../../../../shared/actions/brand.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';
import { FormsModule } from '@angular/forms';


declare const $: any;

@Component({
    selector: 'arth-admin-brand-modal',
    templateUrl: './edit-brand.component.html',
    imports: [FormsModule]
})
export class EditBrandComponent {
  private store = inject<Store<FromAdminBrand.State>>(Store);


  @Input() item: Brand;

  save(valid: boolean | null) {
    if (valid) {
      this.store.dispatch(BrandActions.Create({entity: this.item}));
      $('#brandModal').modal('hide');
    }
  }
}
