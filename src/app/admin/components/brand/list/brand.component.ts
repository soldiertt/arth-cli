import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import {BrandActions} from '../../../../shared/actions/brand.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';

@Component({
  templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit {

  brands$: Observable<Brand[]>;
  edited: Brand;

  constructor(private store: Store<FromAdminBrand.State>) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.brands$ = this.store.select(FromAdminBrand.selectAll);
    this.store.dispatch(BrandActions.GetAll());
  }

  newItem() {
    this.edited = new Brand();
  }

  remove($event, id: string | undefined) {
    $event.preventDefault();
    if (id) {
      this.store.dispatch(BrandActions.Delete({id}));
    }
  }


}
