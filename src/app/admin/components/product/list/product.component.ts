
import {HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {takeUntil, map} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import Article from '../../../../shared/model/article.class';
import {SteelActions} from '../../../actions/steel.actions';
import Brand from '../../../../shared/model/brand.class';
import Category from '../../../../shared/model/category.class';
import {FormBuilder, FormGroup} from '@angular/forms';

import Steel from '../../../../shared/model/steel.class';
import {BrandActions} from '../../../../shared/actions/brand.actions';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {SlideProductActions} from '../../../../shared/actions/slide-product.actions';
import {ProductActions} from '../../../actions/product.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';
import {FromAdminCategory} from '../../../reducers/category.reducer';
import {FromAdminProduct} from '../../../reducers/product.reducer';
import {FromAdminSlideProduct} from '../../../reducers/slide-product.reducer';
import {FromAdminSteel} from '../../../reducers/steel.reducer';
import {PictureService} from '../../../../shared/service/picture.service';
import {saveAs} from 'file-saver';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  products$: Observable<Article[]>;
  categories$: Observable<Category[]>;
  brands$: Observable<Brand[]>;
  steels$: Observable<Steel[]>;

  filteredProducts$: Observable<Article[]>;
  edited: Article;

  filterForm: FormGroup;

  constructor(private productStore: Store<FromAdminProduct.State>,
              private categoryStore: Store<FromAdminCategory.State>,
              private brandStore: Store<FromAdminBrand.State>,
              private steelStore: Store<FromAdminSteel.State>,
              private slideProductStore: Store<FromAdminSlideProduct.State>,
              public picUtil: PictureService,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      categoryFilter: this.fb.control(''),
      brandFilter: this.fb.control(''),
      steelFilter: this.fb.control(''),
      promoFilter: this.fb.control(''),
      instockFilter: this.fb.control('')
    });
  }

  ngOnInit() {
    this.getAll();
    this.filteredProducts$ = this.products$;
    this.filterForm.valueChanges.subscribe(values => {
      this.filteredProducts$ = this.products$.pipe(map((products: Article[]) => {
        return products.filter(product => {
          return (!values.brandFilter || product.marque === values.brandFilter) &&
            (!values.categoryFilter || product.type === values.categoryFilter) &&
            (!values.steelFilter || product.acier === values.steelFilter) &&
            (!values.promoFilter || product.promo.toString() === values.promoFilter) &&
            (!values.instockFilter || product.instock.toString() === values.instockFilter);
        });
      }));
    });

    this.productStore.select(FromAdminProduct.selectCsvData).subscribe(csvData => {
      if (csvData.csvResponse) {
        saveAs(csvData.csvResponse.body!, csvData.filename);
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  getAll() {
    this.products$ = this.productStore.select(FromAdminProduct.selectAll);
    this.productStore.dispatch(ProductActions.GetAll());

    this.categories$ = this.categoryStore.select(FromAdminCategory.selectAll);
    this.categoryStore.dispatch(CategoryActions.GetAll());

    this.brands$ = this.brandStore.select(FromAdminBrand.selectAll);
    this.brandStore.dispatch(BrandActions.GetAll());

    this.steels$ = this.steelStore.select(FromAdminSteel.selectAll);
    this.steelStore.dispatch(SteelActions.GetAll());

    this.slideProductStore.select(FromAdminSlideProduct.selectCreated).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(created => {
        if (created) {
          this.toastr.success('Slide successfully added!', 'Success');
        }
      });
    this.slideProductStore.select(FromAdminSlideProduct.selectError).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(error => {
        if (error) {
          this.toastr.error(error, 'Error when creating slide');
        }
      });
  }

  newItem() {
    this.edited = new Article();
  }

  export() {
    this.productStore.dispatch(
      ProductActions.ExportToCsv({category: this.filterVal('categoryFilter'),
                                     brand: this.filterVal('brandFilter'),
                                     steel: this.filterVal('steelFilter'),
                                     promo: this.filterVal('promoFilter'),
                                     instock: this.filterVal('instockFilter')})
    );
  }

  editItem(item: Article) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string | undefined) {
    if (id) {
      $event.preventDefault();
      this.productStore.dispatch(ProductActions.Delete({id}));
    }
  }

  createSlideProduct($event, product: Article) {
    $event.preventDefault();
    this.slideProductStore.dispatch(SlideProductActions.Create({entity: product}));
  }

  private filterVal(filterField: string): string | undefined {
    const value = this.filterForm.get(filterField)?.value;
    if (value) {
      return value;
    } else {
      return undefined;
    }
  }

}
