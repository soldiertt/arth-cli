import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Country from "../../model/country.class";

@Injectable()
export class CountryRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAll(): Observable<Array<Country>> {
    return this.http.get(this.BASE_URL + "/country").map(res => res.json());
  }

}
