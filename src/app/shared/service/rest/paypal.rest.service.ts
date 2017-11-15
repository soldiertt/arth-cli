import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Cart from '../../../website/model/cart.class';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PaypalRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {
  }

  createPayment(cart: Cart): Observable<any> {
    return this.http.post(this.BASE_URL + '/checkout', cart);
  }

  executePayment(paymentID: string, payerID: string): Observable<any> {
    return this.http.post(this.BASE_URL + '/execute-payment', {paymentID: paymentID, payerID: payerID});
  }

}
