import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {VideoActions} from '../../../../shared/actions/video.actions';
import Video from '../../../../shared/model/video.class';
import {FromAdminVideo} from '../../../reducers/video.reducer';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'arth-admin-video-modal',
    host: {class: 'admin-edit-dialog'},
    templateUrl: './edit-video.component.html',
    imports: [FormsModule, MatDialogModule]
})
export class EditVideoComponent {
  private store = inject<Store<FromAdminVideo.State>>(Store);
  private dialogRef = inject<MatDialogRef<EditVideoComponent>>(MatDialogRef);

  item: Video = inject<Video>(MAT_DIALOG_DATA);

  save(valid: boolean | null) {
    if (valid && (this.item.ref || this.item.title)) {
      this.store.dispatch(VideoActions.Create({entity: this.item}));
      this.dialogRef.close(this.item);
    }
  }
}
