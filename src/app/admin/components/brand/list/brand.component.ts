import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import {BrandActions} from '../../../../shared/actions/brand.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';
import { AsyncPipe } from '@angular/common';
import { EditBrandComponent } from '../edit/edit-brand.component';

@Component({
    templateUrl: './brand.component.html',
    imports: [EditBrandComponent, AsyncPipe]
})
export class BrandComponent implements OnInit {
  private store = inject<Store<FromAdminBrand.State>>(Store);


  brands$: Observable<Brand[]>;
  edited: Brand;

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
