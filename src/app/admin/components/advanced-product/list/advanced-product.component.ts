import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import AdvancedArticle from '../../../../shared/model/advanced-article.class';
import {PictureService} from '../../../../shared/service/picture.service';
import {AdvancedProductActions} from '../../../actions/advanced-product.actions';
import {FromAdminAdvancedProduct} from '../../../reducers/advanced-product.reducer';

@Component({
  templateUrl: './advanced-product.component.html',
  styleUrls: ['./advanced-product.component.css']
})
export class AdvancedProductComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  advancedProducts$: Observable<AdvancedArticle[]>;
  filteredProducts$: Observable<AdvancedArticle[]>;
  edited: AdvancedArticle;

  filterForm: FormGroup;

  constructor(private advancedProductStore: Store<FromAdminAdvancedProduct.State>,
              public picUtil: PictureService,
              private toastr: ToastrService,
              private fb: FormBuilder) {
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

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  getAll() {
    this.advancedProducts$ = this.advancedProductStore.select(FromAdminAdvancedProduct.selectAll);
    this.advancedProductStore.dispatch(AdvancedProductActions.GetAll());
  }

  newItem() {
    this.edited = new AdvancedArticle();
  }

  editItem(item: AdvancedArticle) {
    this.edited = Object.assign({}, item);
  }

  remove($event, id: string | undefined) {
    if (id) {
      $event.preventDefault();
      this.advancedProductStore.dispatch(AdvancedProductActions.Delete({id}));
    }
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
