import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import Article from '../../../../shared/model/article.class';
import * as fromProduct from '../../../reducers/product.reducer';
import * as fromSlideProduct from '../../../reducers/slide-product.reducer';
import * as fromCategory from '../../../reducers/category.reducer';
import * as fromBrand from '../../../reducers/brand.reducer';
import * as productActions from '../../../actions/product.actions';
import * as slideProductActions from '../../../actions/slide-product.actions';
import * as categoryActions from '../../../actions/category.actions';
import * as brandActions from '../../../actions/brand.actions';
import Brand from '../../../../shared/model/brand.class';
import Category from '../../../../shared/model/category.class';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastyConfig, ToastyService} from 'ng2-toasty';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component( {
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  products$: Observable<Article[]>;
  categories$: Observable<Category[]>;
  brands$: Observable<Brand[]>;

  filteredProducts$: Observable<Article[]>;
  edited: Article;

  filterForm: FormGroup;

  constructor(private productStore: Store<fromProduct.State>,
              private categoryStore: Store<fromCategory.State>,
              private brandStore: Store<fromBrand.State>,
              private slideProductStore: Store<fromSlideProduct.State>,
              private toast: ToastyService,
              private toastyConfig: ToastyConfig,
              private fb: FormBuilder) {
    this.toastyConfig.theme = 'bootstrap';
    this.filterForm = this.fb.group({
      categoryFilter: this.fb.control(''),
      brandFilter: this.fb.control(''),
      promoFilter: this.fb.control(''),
      instockFilter: this.fb.control('')
    });
  }

  ngOnInit() {
    this.getAll();
    this.filteredProducts$ = this.products$;
    this.filterForm.valueChanges.subscribe(values => {
      this.filteredProducts$ = this.products$.map((products: Article[]) => {
        return products.filter(product => {
          return (!values.brandFilter || product.marque === values.brandFilter) &&
            (!values.categoryFilter || product.type === values.categoryFilter) &&
            (!values.promoFilter || product.promo.toString() === values.promoFilter) &&
            (!values.instockFilter || product.instock.toString() === values.instockFilter);
        });
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getAll() {
    this.products$ = this.productStore.select(fromProduct.selectAll);
    this.productStore.dispatch(new productActions.GetAll());
    this.categories$ = this.categoryStore.select(fromCategory.selectAll);
    this.categoryStore.dispatch(new categoryActions.GetAll());
    this.brands$ = this.brandStore.select(fromBrand.selectAll);
    this.brandStore.dispatch(new brandActions.GetAll());
    this.slideProductStore.select(fromSlideProduct.selectCreated)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(created => {
      if (created) {
        this.toast.success({title: 'Success', msg: 'Slide successfully added!'});
      }
    });
    this.slideProductStore.select(fromSlideProduct.selectError)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(error => {
      if (error) {
        this.toast.error({title:'Error when creating slide', msg: error});
      }
    });
  }

  newItem() {
    this.edited = new Article();
  }

  editItem(item: Article) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.productStore.dispatch(new productActions.Delete(id));
  }

  createSlideProduct($event, product: Article) {
    $event.preventDefault();
    this.slideProductStore.dispatch(new slideProductActions.Create(product));
  }
}
