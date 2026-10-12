import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import {BrandActions} from '../../../../shared/actions/brand.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';
import {AsyncPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {EditBrandComponent} from '../edit/edit-brand.component';

@Component({
    templateUrl: './brand.component.html',
    imports: [AsyncPipe]
})
export class BrandComponent implements OnInit {
  private store = inject<Store<FromAdminBrand.State>>(Store);
  private dialog = inject(MatDialog);

  brands$: Observable<Brand[]>;

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.brands$ = this.store.select(FromAdminBrand.selectAll);
    this.store.dispatch(BrandActions.GetAll());
  }

  newItem() {
    this.dialog.open(EditBrandComponent, {data: new Brand(), width: '800px'});
  }

  remove($event, id: string | undefined) {
    $event.preventDefault();
    if (id) {
      this.store.dispatch(BrandActions.Delete({id}));
    }
  }

}
