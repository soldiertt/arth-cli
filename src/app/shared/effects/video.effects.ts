import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {VideoActions} from '../actions/video.actions';
import {map, mergeMap} from 'rxjs/operators';
import {VideoRestService} from '../service/rest/video.rest.service';

@Injectable()
export class VideoEffects {

  constructor(private actions$: Actions, private videoRestService: VideoRestService) {}

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(VideoActions.GET_ALL),
    mergeMap(action => this.videoRestService.listAll()),
    map(entities => new VideoActions.GetAllSuccess(entities))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(VideoActions.CREATE),
    map((action: VideoActions.Create) => action.entity),
    mergeMap(entity => this.videoRestService.create(entity)),
    map(entity => new VideoActions.CreateSuccess(entity))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(VideoActions.DELETE),
    map((action: VideoActions.Delete) => action.id),
    mergeMap(id => this.videoRestService.remove(id).pipe(map(() => id))),
    map(id => new VideoActions.DeleteSuccess(id))
  ));

}
