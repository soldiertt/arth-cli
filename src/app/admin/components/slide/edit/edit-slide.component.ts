import {Component, Input, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromSlide from '../../../reducers/slide.reducer';
import Slide from '../../../../shared/model/slider.class';
import * as actions from '../../../actions/slide.actions';
import {FormControl} from '@angular/forms';
import {UploadService} from '../../../../shared/service/upload.service';

declare var $:any;

@Component({
  selector: 'arth-admin-slide-modal',
  templateUrl: './edit-slide.component.html'
})
export class EditSlideComponent {

  @Input() item: Slide;

  picture: FormControl = new FormControl();

  @ViewChild('fileUpload') fileUploadInput: any;

  constructor(private uploadService: UploadService,
              private store: Store<fromSlide.State>) { }

  resetForm() {
    this.fileUploadInput.nativeElement.value = '';
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.item.image = this.uploadService.generateFilename(15, event.target.value);
      this.picture.setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('picture', this.picture.value);
    input.append('filename', this.item.image);
    return input;
  }

  save(valid: boolean) {
    if (valid && (this.item.image || this.item.id)) {
      if (this.item.id) {
        this.store.dispatch(new actions.Update(this.item.id, this.item));
      } else {
        this.store.dispatch(new actions.Create(this.item));
      }
      if (this.item.image) {
        this.store.dispatch(new actions.UploadNewPicture(this.prepareSave()));
      }
      $('#slideModal').modal('hide');
      this.resetForm();
    }
  }
}
