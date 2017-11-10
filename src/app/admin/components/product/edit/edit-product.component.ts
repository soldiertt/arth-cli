import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
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
import {UploadService} from '../../../../shared/service/upload.service';

declare var $:any;

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
              private productStore: Store<fromProduct.State>,
              private categoryStore: Store<fromCategory.State>,
              private brandStore: Store<fromBrand.State>) { }

  ngOnInit() {
    this.categories$ = this.categoryStore.select(fromCategory.selectAll);
    this.brands$ = this.brandStore.select(fromBrand.selectAll);
  }

  resetForm() {
    this.fileUploadInput.nativeElement.value = '';
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.item.picture = this.uploadService.generateFilename(15, event.target.value);
      console.log(this.item.picture);
      this.picture.setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('picture', this.picture.value);
    input.append('filename', this.item.picture);
    input.append('category', this.item.type);
    return input;
  }

  save(ngForm: NgForm) {
    if (ngForm.valid && (this.item.picture || this.item.id)) {
      if (this.item.id) {
        this.productStore.dispatch(new actions.Update(this.item.id, this.item));
      } else {
        this.productStore.dispatch(new actions.Create(this.item));
      }
      if (this.item.picture) {
        this.productStore.dispatch(new actions.UploadNewPicture(this.prepareSave()));
      }
      $('#productModal').modal('hide');
      this.resetForm();
    }
  }

}
