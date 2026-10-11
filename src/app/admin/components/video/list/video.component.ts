import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import Video from '../../../../shared/model/video.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {VideoActions} from '../../../../shared/actions/video.actions';
import {FromAdminVideo} from '../../../reducers/video.reducer';
import { AsyncPipe } from '@angular/common';
import { EditVideoComponent } from '../edit/edit-video.component';

@Component({
    templateUrl: './video.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [EditVideoComponent, AsyncPipe]
})
export class VideoComponent implements OnInit {
  private videoStore = inject<Store<FromAdminVideo.State>>(Store);


  videos$: Observable<Video[]>;
  edited: Video;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.videos$ = this.videoStore.select(FromAdminVideo.selectAll);
    this.videoStore.dispatch(VideoActions.GetAll());
  }

  newItem() {
    this.edited = new Video();
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.videoStore.dispatch(VideoActions.Delete({id}));
  }

}
