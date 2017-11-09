import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import Steel from '../../model/steel.class';

@Injectable()
export class SteelRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAll(): Observable<Steel[]> {
    return this.http.get<Steel[]>(this.BASE_URL + "/steel");
  }

}
