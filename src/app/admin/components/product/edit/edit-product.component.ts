import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import Article from '../../../../shared/model/article.class';
import Category from '../../../../shared/model/category.class';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import 'rxjs/add/operator/combineLatest';
import {UploadService} from '../../../../shared/service/upload.service';
import {ProductActions} from '../../../actions/product.actions';
import {FromAdminBrand} from '../../../reducers/brand.reducer';
import {FromAdminCategory} from '../../../reducers/category.reducer';
import {FromAdminProduct} from '../../../reducers/product.reducer';

declare const $: any;

@Component({
  selector: 'arth-admin-product-modal',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  @Input() item: Article;
  categories$: Observable<Category[]>;
  brands$: Observable<Brand[]>;

  picture: FormControl = new FormControl();

  @ViewChild('fileUpload') fileUploadInput: any;

  constructor(private uploadService: UploadService,
              private productStore: Store<FromAdminProduct.State>,
              private categoryStore: Store<FromAdminCategory.State>,
              private brandStore: Store<FromAdminBrand.State>) { }

  ngOnInit() {
    this.categories$ = this.categoryStore.select(FromAdminCategory.selectAll);
    this.brands$ = this.brandStore.select(FromAdminBrand.selectAll);
  }

  resetForm() {
    this.fileUploadInput.nativeElement.value = '';
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.item.picture = this.uploadService.generateFilename(15, event.target.value);
      this.picture.setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('picture', this.picture.value);
    input.append('filename', this.item.picture);
    input.append('category', this.item.type);
    return input;
  }

  save(ngForm: NgForm) {
    if (ngForm.valid && (this.item.picture || this.item.id)) {
      if (this.item.id) {
        this.productStore.dispatch(new ProductActions.Update(this.item.id, this.item));
      } else {
        this.productStore.dispatch(new ProductActions.Create(this.item));
      }
      if (this.fileUploadInput.nativeElement.value) {
        this.productStore.dispatch(new ProductActions.UploadNewPicture(this.prepareSave()));
      }
      $('#productModal').modal('hide');
      this.resetForm();
    }
  }

}
