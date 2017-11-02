import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import * as fromBrand from '../../../reducers/brand.reducer';
import * as actions from '../../../actions/brand.actions';

@Component({
  templateUrl: './edit-brand.component.html'
})
export class EditBrandComponent {

  newItem: Brand;

  constructor(private router: Router,
              private store: Store<fromBrand.State>) {

    this.newItem = new Brand();
  }

  create(valid: boolean) {
    if (valid) {

      this.store.dispatch(new actions.Create(this.newItem));
      this.router.navigate(['/admin/brands']);
    }
  }
}
