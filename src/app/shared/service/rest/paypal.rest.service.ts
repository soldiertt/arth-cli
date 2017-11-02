import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import Cart from "../../../website/model/cart.class";

@Injectable()
export class PaypalRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  createPayment(cart: Cart): Observable<any> {
    return this.http.post(this.BASE_URL + "/checkout", cart).map(res => res.json());
  }

  executePayment(paymentID: string, payerID: string): Observable<any> {
    return this.http.post(this.BASE_URL + "/execute-payment", {paymentID: paymentID, payerID: payerID}).map(res => res.json());
  }

}
