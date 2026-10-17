import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {FormArray, FormControl, FormsModule, NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import AdvancedArticle from '../../../../shared/model/advanced-article.class';
import {UploadService} from '../../../../shared/service/upload.service';
import {AdvancedProductActions} from '../../../actions/advanced-product.actions';
import {FromAdminAdvancedProduct} from '../../../reducers/advanced-product.reducer';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';


interface AdvancedProductCategory {
  name: string;
  code: string;
}

@Component({
    selector: 'arth-admin-advanced-product-modal',
    host: {class: 'admin-edit-dialog'},
    templateUrl: './edit-advanced-product.component.html',
    imports: [FormsModule, MatDialogModule]
})
export class EditAdvancedProductComponent {
  private uploadService = inject(UploadService);
  private advancedProductStore = inject<Store<FromAdminAdvancedProduct.State>>(Store);
  private dialogRef = inject<MatDialogRef<EditAdvancedProductComponent>>(MatDialogRef);

  readonly item = signal<AdvancedArticle>(inject(MAT_DIALOG_DATA));

  categories: AdvancedProductCategory[] = [
    {name: 'Homemade knife', code: 'homemadeknives'},
    {name: 'Stick', code: 'sticks'},
    {name: 'Bracelet', code: 'bracelet'}
  ];
  localPictures: string[] = [];
  pictures: FormArray = new FormArray<any>([]);

  readonly fileUploadInput = viewChild<ElementRef>('fileUpload');

  resetForm() {
    this.fileUploadInput().nativeElement.value = '';
    this.localPictures = [];
    this.pictures.clear();
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
      input.append('category', this.item().type);
      data.push(input);
    });
    return data;
  }

  save(ngForm: NgForm) {
    const item = this.item();
    if (ngForm.valid && (this.localPictures || item.id)) {
      if (this.localPictures.length) {
        item.pictures = [...this.localPictures];
      }
      if (item.id) {
        this.advancedProductStore.dispatch(AdvancedProductActions.Update({id: item.id, changes: item}));
      } else {
        this.advancedProductStore.dispatch(AdvancedProductActions.Create({entity: item}));
      }
      if (this.localPictures.length) {
        this.prepareSave().forEach((formData) => {
          this.advancedProductStore.dispatch(AdvancedProductActions.UploadNewPicture({formData}));
        });
      }
      this.dialogRef.close(item);
    }
  }

}
