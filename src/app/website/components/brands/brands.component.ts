import {Component, OnInit} from '@angular/core';
import Brand from '../../../shared/model/brand.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FromBrand} from '../../reducers/brand.reducer';
import {BrandActions} from '../../../shared/actions/brand.actions';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-brands',
    templateUrl: 'brands.component.html',
    imports: [RouterLink, NgFor, AsyncPipe, I18nPipe]
})
export class BrandsComponent implements OnInit {

  brands$: Observable<Brand[]>;

  constructor(private store: Store<FromBrand.State>) {
  }

  ngOnInit() {
    this.brands$ = this.store.select(FromBrand.selectAll);
    this.store.dispatch(BrandActions.GetAllFromProduct());
  }

}
