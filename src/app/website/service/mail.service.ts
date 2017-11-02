import {Injectable, Inject} from "@angular/core";
import {Headers} from '@angular/http';
import Mail from "../model/mail.class";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
@Injectable()
export class MailService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  sendMail(userId: string, mail: Mail): Observable<any> {
    const headers = new Headers();
    headers.append('X-Arth-User-Identifier', userId);
    return this.http.post(this.BASE_URL + "/mail", mail, {headers}).map(res => res.json());
  }
}
