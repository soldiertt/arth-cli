import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormArray, FormControl, NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import AdvancedArticle from '../../../../shared/model/advanced-article.class';
import {UploadService} from '../../../../shared/service/upload.service';
import {AdvancedProductActions} from '../../../actions/advanced-product.actions';
import {FromAdminAdvancedProduct} from '../../../reducers/advanced-product.reducer';

declare const $: any;

interface AdvancedProductCategory {
  name: string;
  code: string;
}

@Component({
  selector: 'arth-admin-advanced-product-modal',
  templateUrl: './edit-advanced-product.component.html'
})
export class EditAdvancedProductComponent {

  @Input() item: AdvancedArticle;
  categories: AdvancedProductCategory[] = [
    {name: 'Homemade knife', code: 'homemadeknives'},
    {name: 'Stick', code: 'sticks'},
    {name: 'Bracelet', code: 'bracelet'}
  ];
  localPictures: string[] = [];
  pictures: FormArray = new FormArray<any>([]);

  @ViewChild('fileUpload') fileUploadInput: ElementRef;

  constructor(private uploadService: UploadService,
              private advancedProductStore: Store<FromAdminAdvancedProduct.State>) {
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
        this.advancedProductStore.dispatch(AdvancedProductActions.Update({id: this.item.id, changes: this.item}));
      } else {
        this.advancedProductStore.dispatch(AdvancedProductActions.Create({entity: this.item}));
      }
      if (this.localPictures.length) {
        this.prepareSave().forEach((formData) => {
          this.advancedProductStore.dispatch(AdvancedProductActions.UploadNewPicture({formData}));
        });
      }
      $('#advancedProductModal').modal('hide');
      this.resetForm();
    }
  }

}
