import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';

import Country from '../../model/country.class';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CountryRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {
  }

  listAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.BASE_URL + '/country');
  }

}
