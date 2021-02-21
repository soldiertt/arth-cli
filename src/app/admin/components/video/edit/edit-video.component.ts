import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {VideoActions} from '../../../../shared/actions/video.actions';
import Video from '../../../../shared/model/video.class';
import {FromAdminVideo} from '../../../reducers/video.reducer';

declare const $: any;

@Component({
  selector: 'arth-admin-video-modal',
  templateUrl: './edit-video.component.html'
})
export class EditVideoComponent {

  @Input() item: Video;

  constructor(private store: Store<FromAdminVideo.State>) { }

  save(valid: boolean) {
    if (valid && (this.item.ref || this.item.title)) {
      this.store.dispatch(new VideoActions.Create(this.item));
      $('#videoModal').modal('hide');
    }
  }
}
