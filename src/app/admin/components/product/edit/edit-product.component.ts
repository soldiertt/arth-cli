import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import Article from '../../../../shared/model/article.class';
import Category from '../../../../shared/model/category.class';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromProduct from '../../../reducers/product.reducer';
import * as fromCategory from '../../../reducers/category.reducer';
import * as fromBrand from '../../../reducers/brand.reducer';
import * as actions from '../../../actions/product.actions';
import Brand from '../../../../shared/model/brand.class';
import 'rxjs/add/operator/combineLatest';

declare var $:any;

@Component({
  selector: 'arth-admin-product-modal',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  @Input() item: Article;
  categories$: Observable<Category[]>;
  brands$: Observable<Brand[]>;

  constructor(private productStore: Store<fromProduct.State>,
              private categoryStore: Store<fromCategory.State>,
              private brandStore: Store<fromBrand.State>) { }

  ngOnInit() {
    this.categories$ = this.categoryStore.select(fromCategory.selectAll);
    this.brands$ = this.brandStore.select(fromBrand.selectAll);
  }

  save(ngForm: NgForm) {
    if (ngForm.valid) {
      if (this.item.id) {
        this.productStore.dispatch(new actions.Update(this.item.id, this.item));
      } else {
        this.productStore.dispatch(new actions.Create(this.item));
      }
      $('#productModal').modal('hide');
    }
  }

}
