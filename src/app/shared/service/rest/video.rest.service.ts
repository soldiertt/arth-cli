import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import Video from '../../model/video.class';

@Injectable()
export class VideoRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {
  }

  listAll(): Observable<Video[]> {
    return this.http.get<Video[]>(this.BASE_URL + '/videos');
  }

  create(video: Video): Observable<Video> {
    return this.http.post<Video>(this.BASE_URL + '/videos', video);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/videos/' + id);
  }

}
