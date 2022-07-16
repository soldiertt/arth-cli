import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {VideoActions} from '../actions/video.actions';
import {map, mergeMap} from 'rxjs/operators';
import {VideoRestService} from '../service/rest/video.rest.service';

@Injectable()
export class VideoEffects {

  constructor(private actions: Actions, private videoRestService: VideoRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(VideoActions.GET_ALL)
    .pipe(
      mergeMap(action => this.videoRestService.listAll()),
      map(entities => new VideoActions.GetAllSuccess(entities))
    );

  @Effect()
  create: Observable<Action> = this.actions.ofType(VideoActions.CREATE)
    .pipe(
      map((action: VideoActions.Create) => action.entity),
      mergeMap(entity => this.videoRestService.create(entity)),
      map(entity => new VideoActions.CreateSuccess(entity))
    );

  @Effect()
  remove: Observable<Action> = this.actions.ofType(VideoActions.DELETE)
    .pipe(
      map((action: VideoActions.Delete) => action.id),
      mergeMap(id => this.videoRestService.remove(id).pipe(map(() => id))),
      map(id => new VideoActions.DeleteSuccess(id))
    );

}
