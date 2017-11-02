import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Brand from '../../model/brand.class';

@Injectable()
export class BrandRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAll(): Observable<Brand[]> {
    return this.http.get(this.BASE_URL + "/brand").map(res => res.json());
  }

  create(brand: Brand): Observable<any> {
    return this.http.post(this.BASE_URL + "/brand", brand).map(res => res.json());
  }

  remove(brandId: string): Observable<any> {
    return this.http.delete(this.BASE_URL + "/brand/" + brandId).map(res => res.json());
  }
}
