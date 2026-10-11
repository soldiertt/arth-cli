import { Injectable, inject } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Steel from '../../model/steel.class';

@Injectable()
export class SteelRestService {
  private http = inject(HttpClient);
  private BASE_URL = inject<string>('REST_ENDPOINT' as any);


  listAll(): Observable<Steel[]> {
    return this.http.get<Steel[]>(this.BASE_URL + '/steel');
  }

}
