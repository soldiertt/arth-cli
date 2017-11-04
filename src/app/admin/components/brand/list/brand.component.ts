import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import * as fromBrand from '../../../reducers/brand.reducer';
import * as actions from '../../../actions/brand.actions';

@Component({
  templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit {

  brands$: Observable<Brand[]>;
  edited: Brand;

  constructor(private store: Store<fromBrand.State>) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.brands$ = this.store.select(fromBrand.selectAll);
    this.store.dispatch(new actions.GetAll());
  }

  newItem() {
    this.edited = new Brand();
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.store.dispatch(new actions.Delete(id));
  }


}
