import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import PaypalOrder from "../../model/paypalorder.class";
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class PaypalOrderRestService {

  constructor(private http: HttpClient, @Inject('REST_ENDPOINT') private BASE_URL: string) {}

  listAll(): Observable<PaypalOrder[]> {
    return this.http.get<PaypalOrder[]>(this.BASE_URL + "/order").map(dbOrders => this.mapPaypalOrders(dbOrders));
  }

  listAllByUser(userId: string): Observable<PaypalOrder[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('userId', userId);
    return this.http.get<PaypalOrder[]>(this.BASE_URL + "/order", {params}).map(dbOrders => this.mapPaypalOrders(dbOrders));
  }

  save(paypalOrder: PaypalOrder): Observable<any> {
    return this.http.post(this.BASE_URL + "/order", paypalOrder);
  }

  private mapPaypalOrders(dbOrderArray): PaypalOrder[] {
    return dbOrderArray.map(dbOrder => {
      let paypalOrder = new PaypalOrder();
      paypalOrder.id = dbOrder.id;
      paypalOrder.userId = dbOrder.user_id;
      paypalOrder.orderDate = dbOrder.order_date;
      paypalOrder.json = dbOrder.order_json;
      return paypalOrder;
    });
  }
}
