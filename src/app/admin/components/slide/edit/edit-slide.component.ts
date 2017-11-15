import {Component, Input, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import Slide from '../../../../shared/model/slider.class';
import {FormControl} from '@angular/forms';
import {UploadService} from '../../../../shared/service/upload.service';
import {SlideActions} from '../../../../shared/actions/slide.actions';
import {FromAdminSlide} from '../../../reducers/slide.reducer';

declare const $: any;

@Component({
  selector: 'arth-admin-slide-modal',
  templateUrl: './edit-slide.component.html'
})
export class EditSlideComponent {

  @Input() item: Slide;

  picture: FormControl = new FormControl();

  @ViewChild('fileUpload') fileUploadInput: any;

  constructor(private uploadService: UploadService,
              private store: Store<FromAdminSlide.State>) { }

  resetForm() {
    this.fileUploadInput.nativeElement.value = '';
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.item.image = this.uploadService.generateFilename(15, event.target.value);
      this.picture.setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('picture', this.picture.value);
    input.append('filename', this.item.image);
    return input;
  }

  save(valid: boolean) {
    if (valid && (this.item.image || this.item.id)) {
      if (this.item.id) {
        this.store.dispatch(new SlideActions.Update(this.item.id, this.item));
      } else {
        this.store.dispatch(new SlideActions.Create(this.item));
      }
      if (this.fileUploadInput.nativeElement.value) {
        this.store.dispatch(new SlideActions.UploadNewPicture(this.prepareSave()));
      }
      $('#slideModal').modal('hide');
      this.resetForm();
    }
  }
}
