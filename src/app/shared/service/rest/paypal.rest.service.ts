import { Injectable, inject } from '@angular/core';
import {Observable} from 'rxjs';

import Cart from '../../../website/model/cart.class';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaypalRestService {
  private http = inject(HttpClient);
  private BASE_URL = inject<string>('REST_ENDPOINT' as any);


  createPayment(cart: Cart): Observable<any> {
    return this.http.post(this.BASE_URL + '/checkout', cart);
  }

  executePayment(paymentID: string, payerID: string): Observable<any> {
    return this.http.post(this.BASE_URL + '/execute-payment', {paymentID: paymentID, payerID: payerID});
  }

}
