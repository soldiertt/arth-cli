import {Injectable, Inject} from "@angular/core";
import Mail from "../model/mail.class";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
@Injectable()
export class MailService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  sendMail(mail: Mail): Observable<any> {
    return this.http.post(this.BASE_URL + "/mail", mail).map(res => res.json());
  }
}
