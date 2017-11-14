import {Component, OnInit} from "@angular/core";
import Brand from "../../../shared/model/brand.class";
import {Store} from '@ngrx/store';
import * as fromBrand from '../../reducers/brand.reducer';
import {Observable} from 'rxjs/Observable';
import {BrandActions} from '../../actions/brand.actions';
import {FromBrand} from '../../reducers/brand.reducer';

@Component({
  selector: 'arth-brands',
  templateUrl: 'brands.component.html'
})
export class BrandsComponent implements OnInit {

  brands$: Observable<Brand[]>;

  constructor(private store: Store<FromBrand.State>) {}

  ngOnInit() {
    this.brands$ = this.store.select(FromBrand.selectAll);
    this.store.dispatch(new BrandActions.GetAll());
  }

}
