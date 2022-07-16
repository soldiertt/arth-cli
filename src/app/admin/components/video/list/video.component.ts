import {Component, OnInit} from '@angular/core';
import Video from '../../../../shared/model/video.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {VideoActions} from '../../../../shared/actions/video.actions';
import {FromAdminVideo} from '../../../reducers/video.reducer';

@Component({
  templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit {

  videos$: Observable<Video[]>;
  edited: Video;

  constructor(private videoStore: Store<FromAdminVideo.State>) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.videos$ = this.videoStore.select(FromAdminVideo.selectAll);
    this.videoStore.dispatch(new VideoActions.GetAll());
  }

  newItem() {
    this.edited = new Video();
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.videoStore.dispatch(new VideoActions.Delete(id));
  }

}
