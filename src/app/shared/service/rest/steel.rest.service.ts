import { Injectable, inject } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Steel from '../../model/steel.class';
import {REST_ENDPOINT} from '../../tokens';

@Injectable()
export class SteelRestService {
  private http = inject(HttpClient);
  private BASE_URL = inject(REST_ENDPOINT);


  listAll(): Observable<Steel[]> {
    return this.http.get<Steel[]>(this.BASE_URL + '/steel');
  }

}
