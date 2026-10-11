import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import Brand from '../../model/brand.class';
import {HttpClient} from '@angular/common/http';
import {REST_ENDPOINT} from '../../tokens';

@Injectable()
export class BrandRestService {
  private http = inject(HttpClient);
  private BASE_URL = inject(REST_ENDPOINT);


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
