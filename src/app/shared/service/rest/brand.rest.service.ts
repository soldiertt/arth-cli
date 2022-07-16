import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';

import Brand from '../../model/brand.class';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BrandRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {
  }

  listAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.BASE_URL + '/brand');
  }

  create(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.BASE_URL + '/brand', brand);
  }

  remove(brandId: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/brand/' + brandId);
  }
}
