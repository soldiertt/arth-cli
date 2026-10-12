import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import AdvancedArticle from '../../../../shared/model/advanced-article.class';
import {PictureService} from '../../../../shared/service/picture.service';
import {AdvancedProductActions} from '../../../actions/advanced-product.actions';
import {FromAdminAdvancedProduct} from '../../../reducers/advanced-product.reducer';
import {AsyncPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {EditAdvancedProductComponent} from '../edit/edit-advanced-product.component';

interface AdvancedProductCategory {
  name: string;
  code: string;
}

@Component({
    templateUrl: './advanced-product.component.html',
    styleUrls: ['./advanced-product.component.css'],
    imports: [FormsModule, ReactiveFormsModule, AsyncPipe]
})
export class AdvancedProductComponent implements OnInit {
  private advancedProductStore = inject<Store<FromAdminAdvancedProduct.State>>(Store);
  picUtil = inject(PictureService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  advancedProducts$: Observable<AdvancedArticle[]>;
  filteredProducts$: Observable<AdvancedArticle[]>;
  filterForm: FormGroup;
  categories: AdvancedProductCategory[] = [
    {name: 'Homemade knife', code: 'homemadeknives'},
    {name: 'Stick', code: 'sticks'},
    {name: 'Bracelet', code: 'bracelet'}
  ];

  constructor() {
    this.filterForm = this.fb.group({
      categoryFilter: this.fb.control('')
    });
  }

  ngOnInit() {
    this.getAll();
    this.filteredProducts$ = this.advancedProducts$;
    this.filterForm.valueChanges.subscribe(values => {
      this.filteredProducts$ = this.advancedProducts$.pipe(map((products: AdvancedArticle[]) => {
        return products.filter(product => {
          return (!values.categoryFilter || product.type === values.categoryFilter);
        });
      }));
    });
  }

  private getAll() {
    this.advancedProducts$ = this.advancedProductStore.select(FromAdminAdvancedProduct.selectAll);
    this.advancedProductStore.dispatch(AdvancedProductActions.GetAll());
  }

  newItem() {
    this.dialog.open(EditAdvancedProductComponent, {data: new AdvancedArticle(), width: '800px'});
  }

  editItem($event, item: AdvancedArticle) {
    $event.preventDefault();
    this.dialog.open(EditAdvancedProductComponent, {data: Object.assign({}, item), width: '800px'});
  }

  remove($event, id: string | undefined) {
    if (id) {
      $event.preventDefault();
      this.advancedProductStore.dispatch(AdvancedProductActions.Delete({id}));
    }
  }

}
