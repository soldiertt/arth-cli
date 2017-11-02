import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

@Component({
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  id: string;
  item: Article;
  categories$: Observable<Category[]>;
  brands$: Observable<Brand[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productStore: Store<fromProduct.State>,
              private categoryStore: Store<fromCategory.State>,
              private brandStore: Store<fromBrand.State>) {

    this.route.params.combineLatest(this.productStore.select(fromProduct.selectAll))
      .subscribe((results: [any, Article[]]) => {
        if (results[0].id) {
          this.id = results[0].id;
          this.item = Object.assign({}, results[1].find(product => {
            return product.id === this.id;
          }));
        } else {
          this.item = new Article();
        }
    });
  }

  ngOnInit() {
    this.categories$ = this.categoryStore.select(fromCategory.selectAll);
    this.brands$ = this.brandStore.select(fromBrand.selectAll);
  }

  save(ngForm: NgForm) {
    if (ngForm.valid) {
      if (this.item.id) {
        this.productStore.dispatch(new actions.Update(this.id, this.item));
      } else {
        this.productStore.dispatch(new actions.Create(this.item));
      }
      this.router.navigate(['/admin/products']);
    }
  }

}
