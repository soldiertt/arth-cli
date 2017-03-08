import {Injectable, Inject} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import PaypalOrder from "../model/paypalorder.class";

@Injectable()
export class PaypalOrderRestService {

  constructor(private http: Http, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAllByUser(userId: string): Observable<Array<PaypalOrder>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId);
    return this.http.get(this.BASE_URL + "/order", {search: params}).map(res => res.json()).map(dbOrder => this.paypalOrder(dbOrder));
  }

  save(paypalOrder: PaypalOrder): Observable<any> {
    return this.http.post(this.BASE_URL + "/order", paypalOrder).map(res => res.json());
  }

  private paypalOrder(dbOrderArray): PaypalOrder[] {
    return dbOrderArray.map(dbOrder => {
      let paypalOrder = new PaypalOrder();
      paypalOrder.userId = dbOrder.user_id;
      paypalOrder.orderDate = dbOrder.order_date;
      paypalOrder.json = dbOrder.order_json;
      return paypalOrder;
    });
  }
}
