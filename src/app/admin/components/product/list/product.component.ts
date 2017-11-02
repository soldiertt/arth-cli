import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import Article from '../../../../shared/model/article.class';
import * as fromProduct from '../../../reducers/product.reducer';
import * as fromCategory from '../../../reducers/category.reducer';
import * as fromBrand from '../../../reducers/brand.reducer';
import * as productActions from '../../../actions/product.actions';
import * as categoryActions from '../../../actions/category.actions';
import * as brandActions from '../../../actions/brand.actions';
import Brand from '../../../../shared/model/brand.class';
import Category from '../../../../shared/model/category.class';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';

@Component( {
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  subRouteActive: boolean = false;

  products$: Observable<Article[]>;
  categories$: Observable<Category[]>;
  brands$: Observable<Brand[]>;

  filteredProducts$: Observable<Article[]>;

  filterForm: FormGroup;

  constructor(private router: Router,
              private productStore: Store<fromProduct.State>,
              private categoryStore: Store<fromCategory.State>,
              private brandStore: Store<fromBrand.State>,
              private fb: FormBuilder) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.subRouteActive = (event.url.includes('/edit/') || event.url.includes('/add'));
    });
    this.filterForm = this.fb.group({
      categoryFilter: this.fb.control(''),
      brandFilter: this.fb.control('')
    });
  }

  ngOnInit() {
    this.getAll();
    this.filteredProducts$ = this.products$;
    this.filterForm.valueChanges.subscribe(values => {
      console.log(values);
      this.filteredProducts$ = this.products$.map((products: Article[]) => {
        return products.filter(product => {
          return (!values.brandFilter || product.marque === values.brandFilter) &&
            (!values.categoryFilter || product.type === values.categoryFilter);
        });
      });
    });
  }

  getAll() {
    this.products$ = this.productStore.select(fromProduct.selectAll);
    this.productStore.dispatch(new productActions.GetAll());
    this.categories$ = this.categoryStore.select(fromCategory.selectAll);
    this.categoryStore.dispatch(new categoryActions.GetAll());
    this.brands$ = this.brandStore.select(fromBrand.selectAll);
    this.brandStore.dispatch(new brandActions.GetAll());
  }

  remove($event, id: number) {
    $event.preventDefault();
    this.productStore.dispatch(new productActions.Delete(String(id)));
  }

}
