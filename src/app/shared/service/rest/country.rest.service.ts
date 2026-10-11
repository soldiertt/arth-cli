import { Injectable, inject } from '@angular/core';
import {Observable} from 'rxjs';

import Country from '../../model/country.class';
import { HttpClient } from '@angular/common/http';
import {REST_ENDPOINT} from '../../tokens';

@Injectable()
export class CountryRestService {
  private http = inject(HttpClient);
  private BASE_URL = inject(REST_ENDPOINT);


  listAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.BASE_URL + '/country');
  }

}
