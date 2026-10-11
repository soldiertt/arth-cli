import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import {BrandActions} from '../../../../shared/actions/brand.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

declare const $: any;

@Component({
    selector: 'arth-admin-brand-modal',
    templateUrl: './edit-brand.component.html',
    imports: [FormsModule, NgIf]
})
export class EditBrandComponent {

  @Input() item: Brand;

  constructor(private store: Store<FromAdminBrand.State>) { }

  save(valid: boolean | null) {
    if (valid) {
      this.store.dispatch(BrandActions.Create({entity: this.item}));
      $('#brandModal').modal('hide');
    }
  }
}
