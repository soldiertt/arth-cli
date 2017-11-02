import {Injectable, Inject} from "@angular/core";
import Mail from "../model/mail.class";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MailService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  sendMail(mail: Mail): Observable<any> {
    return this.http.post(this.BASE_URL + "/mail", mail);
  }
}
