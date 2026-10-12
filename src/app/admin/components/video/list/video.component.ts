import {Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import Video from '../../../../shared/model/video.class';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {VideoActions} from '../../../../shared/actions/video.actions';
import {FromAdminVideo} from '../../../reducers/video.reducer';
import {AsyncPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {EditVideoComponent} from '../edit/edit-video.component';

@Component({
    templateUrl: './video.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe]
})
export class VideoComponent implements OnInit {
  private videoStore = inject<Store<FromAdminVideo.State>>(Store);
  private dialog = inject(MatDialog);


  videos$: Observable<Video[]>;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.videos$ = this.videoStore.select(FromAdminVideo.selectAll);
    this.videoStore.dispatch(VideoActions.GetAll());
  }

  newItem() {
    this.dialog.open(EditVideoComponent, {data: new Video(), width: '800px'});
  }

  remove($event, id: string) {
    $event.preventDefault();
    this.videoStore.dispatch(VideoActions.Delete({id}));
  }

}
