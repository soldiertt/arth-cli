import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Slide from "../model/slider.class";

@Injectable()
export class SliderRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAll(): Observable<Array<Slide>> {
    return this.http.get(this.BASE_URL + "/slider").map(res => res.json());
  }

}
