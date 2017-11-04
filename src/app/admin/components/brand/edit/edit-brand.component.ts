import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import * as fromBrand from '../../../reducers/brand.reducer';
import * as actions from '../../../actions/brand.actions';

declare var $:any;

@Component({
  selector: 'arth-admin-brand-modal',
  templateUrl: './edit-brand.component.html'
})
export class EditBrandComponent {

  @Input() item: Brand;

  constructor(private store: Store<fromBrand.State>) { }

  save(valid: boolean) {
    if (valid) {
      this.store.dispatch(new actions.Create(this.item));
      $('#brandModal').modal('hide');
    }
  }
}
