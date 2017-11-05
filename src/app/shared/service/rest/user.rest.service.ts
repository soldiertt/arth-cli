import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import UserMetaData from "../../../website/model/usermetadata.class";
import {HttpClient} from '@angular/common/http';
import UserProfile from '../../../website/model/user-profile.class';

@Injectable()
export class UserRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.BASE_URL + "/user").map(users => this.mapUsers(users));
  }

  getUser(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.BASE_URL + "/user/" + userId);
  }

  updateProfile(userId: string, metadata: UserMetaData): Observable<any> {
    let userMetadata = {user_metadata: metadata};
    return this.http.patch(this.BASE_URL + "/user/" + userId, userMetadata);
  }

  private mapUsers(authUserArray): UserProfile[] {
    return authUserArray.map(authUser => {
      authUser.id = authUser.user_id;
      return authUser;
    });
  }
}
