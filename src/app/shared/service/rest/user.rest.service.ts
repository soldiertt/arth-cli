import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import UserMetaData from "../../../website/model/usermetadata.class";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  getUser(userId: string): Observable<any> {
    return this.http.get(this.BASE_URL + "/user/" + userId);
  }

  updateProfile(userId: string, metadata: UserMetaData): Observable<any> {
    let userMetadata = {user_metadata: metadata};
    return this.http.patch(this.BASE_URL + "/user/" + userId, userMetadata);
  }
}
