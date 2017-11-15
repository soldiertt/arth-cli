import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Slide from '../../model/slider.class';
import {HttpClient} from '@angular/common/http';
import Article from '../../model/article.class';

@Injectable()
export class SliderRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {
  }

  listAll(): Observable<Slide[]> {
    return this.http.get<Slide[]>(this.BASE_URL + '/slider');
  }

  listAllSlideProducts(): Observable<Article[]> {
    return this.http.get<Article[]>(this.BASE_URL + '/slideproduct');
  }

  create(slide: Slide): Observable<Slide> {
    return this.http.post<Slide>(this.BASE_URL + '/slider', slide);
  }

  createSlideProduct(product: Article): Observable<Article> {
    return this.http.post<Article>(this.BASE_URL + '/slideproduct', product);
  }

  update(id: string, slide: Slide): Observable<any> {
    return this.http.put(this.BASE_URL + '/slider/' + id, slide);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/slider/' + id);
  }

  removeSlideProduct(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/slideproduct/' + id);
  }

  uploadPicture(data: FormData) {
    return this.http.post(this.BASE_URL + '/slider/upload', data);
  }
}
