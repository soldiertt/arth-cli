import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import AdvancedArticle from '../../model/advanced-article.class';

@Injectable()
export class AdvancedArticleRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {
  }

  listAll(): Observable<AdvancedArticle[]> {
    return this.http.get<AdvancedArticle[]>(this.BASE_URL + '/advancedproduct');
  }

  create(product: AdvancedArticle): Observable<AdvancedArticle> {
    return this.http.post<AdvancedArticle>(this.BASE_URL + '/advancedproduct', product);
  }

  update(id: string, product: AdvancedArticle): Observable<any> {
    return this.http.put(this.BASE_URL + '/advancedproduct/' + id, product);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/advancedproduct/' + id);
  }

  uploadPicture(data: FormData) {
    return this.http.post(this.BASE_URL + '/advancedproduct/upload', data);
  }

}
