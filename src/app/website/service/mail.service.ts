import { Injectable, inject } from '@angular/core';
import Mail from '../model/mail.class';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {REST_ENDPOINT} from '../../shared/tokens';

@Injectable()
export class MailService {
  private http = inject(HttpClient);
  private BASE_URL = inject(REST_ENDPOINT);


  sendMail(mail: Mail): Observable<any> {
    return this.http.post(this.BASE_URL + '/mail', mail);
  }
}
