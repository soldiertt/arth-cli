import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import Video from '../../model/video.class';
import {REST_ENDPOINT} from '../../tokens';

@Injectable()
export class VideoRestService {
  private http = inject(HttpClient);
  private BASE_URL = inject(REST_ENDPOINT);


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
