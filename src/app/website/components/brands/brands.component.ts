import {Component, OnInit} from '@angular/core';
import Brand from '../../../shared/model/brand.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FromBrand} from '../../reducers/brand.reducer';
import {BrandActions} from '../../../shared/actions/brand.actions';

@Component({
  selector: 'arth-brands',
  templateUrl: 'brands.component.html'
})
export class BrandsComponent implements OnInit {

  brands$: Observable<Brand[]>;

  constructor(private store: Store<FromBrand.State>) {
  }

  ngOnInit() {
    this.brands$ = this.store.select(FromBrand.selectAll);
    this.store.dispatch(new BrandActions.GetAllFromProduct());
  }

}
