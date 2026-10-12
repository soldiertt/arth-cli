import {Component, inject, viewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import Slide from '../../../../shared/model/slider.class';
import {FormControl, FormsModule} from '@angular/forms';
import {UploadService} from '../../../../shared/service/upload.service';
import {SlideActions} from '../../../../shared/actions/slide.actions';
import {FromAdminSlide} from '../../../reducers/slide.reducer';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'arth-admin-slide-modal',
    templateUrl: './edit-slide.component.html',
    imports: [FormsModule, MatDialogModule]
})
export class EditSlideComponent {
  private uploadService = inject(UploadService);
  private store = inject<Store<FromAdminSlide.State>>(Store);
  private dialogRef = inject<MatDialogRef<EditSlideComponent>>(MatDialogRef);

  item: Slide = inject<Slide>(MAT_DIALOG_DATA);

  picture: FormControl = new FormControl();

  readonly fileUploadInput = viewChild<any>('fileUpload');

  resetForm() {
    this.fileUploadInput().nativeElement.value = '';
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.item.image = this.uploadService.generateFilename(15, event.target.value);
      this.picture.setValue(file);
    }
  }

  private prepareSave(): FormData {
    const input = new FormData();
    input.append('picture', this.picture.value);
    input.append('filename', this.item.image);
    return input;
  }

  save(valid: boolean | null) {
    if (valid && (this.item.image || this.item.id)) {
      if (this.item.id) {
        this.store.dispatch(SlideActions.Update({id: this.item.id, changes: this.item}));
      } else {
        this.store.dispatch(SlideActions.Create({entity: this.item}));
      }
      if (this.fileUploadInput().nativeElement.value) {
        this.store.dispatch(SlideActions.UploadNewPicture({formData: this.prepareSave()}));
      }
      this.dialogRef.close(this.item);
    }
  }
}
