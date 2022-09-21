import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, NgForm} from '@angular/forms';
import Article from '../../../../shared/model/article.class';
import Category from '../../../../shared/model/category.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';

import {UploadService} from '../../../../shared/service/upload.service';
import {AdvancedProductActions} from '../../../actions/advanced-product.actions';
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
  localPictures: string[] = [];
  pictures: FormArray = new FormArray<any>([]);

  @ViewChild('fileUpload') fileUploadInput: ElementRef;

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
    this.localPictures = [];
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.localPictures.push(this.uploadService.generateFilename(15, event.target.value));
        this.pictures.push(new FormControl(file));
      }
    }
  }

  private prepareSave(): FormData[] {
    const data: FormData[] = [];
    this.localPictures.forEach((fileName, idx) => {
      const input = new FormData();
      input.append('picture', this.pictures.controls.shift().value);
      input.append('filename', fileName);
      input.append('category', this.item.type);
      data.push(input);
    });
    return data;
  }

  save(ngForm: NgForm) {
    if (ngForm.valid && (this.localPictures || this.item.id)) {
      if (this.localPictures.length) {
        this.item.pictures = [...this.localPictures];
      }
      if (this.item.id) {
        this.productStore.dispatch(ProductActions.Update({id: this.item.id, changes: this.item}));
      } else {
        this.productStore.dispatch(ProductActions.Create({entity: this.item}));
      }
      if (this.localPictures.length) {
        this.prepareSave().forEach((formData) => {
          this.productStore.dispatch(ProductActions.UploadNewPicture({formData}));
        });
      }
      $('#productModal').modal('hide');
      this.resetForm();
    }
  }

}
