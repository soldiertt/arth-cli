import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import Cart from '../../../website/model/cart.class';
import {HttpClient} from '@angular/common/http';
import {REST_ENDPOINT} from '../../tokens';

export interface PaypalCreateOrderResponse {
  id: string;
}

export interface PaypalCaptureItem {
  name: string;
  price: string;
  quantity: string;
}

export interface PaypalCaptureAmount {
  total: string;
  currency: string;
  details: {
    subtotal: string;
    shipping: string;
    shipping_discount: string;
  };
}

export interface PaypalCaptureOrderResponse {
  items: PaypalCaptureItem[];
  amount: PaypalCaptureAmount;
}

@Injectable()
export class PaypalRestService {
  private http = inject(HttpClient);
  private BASE_URL = inject(REST_ENDPOINT);


  createOrder(cart: Cart): Observable<PaypalCreateOrderResponse> {
    return this.http.post<PaypalCreateOrderResponse>(this.BASE_URL + '/create-order', cart);
  }

  captureOrder(orderID: string, userId: string): Observable<PaypalCaptureOrderResponse> {
    return this.http.post<PaypalCaptureOrderResponse>(this.BASE_URL + '/capture-order', {
      orderID,
      userId
    });
  }

}
