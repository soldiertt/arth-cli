import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {PaypalOrderRestService} from '../../shared/service/rest/paypalorder.rest.service';
import {PaypalRestService} from '../../shared/service/rest/paypal.rest.service';
import Mail from '../model/mail.class';
import PaypalOrder from '../../shared/model/paypalorder.class';
import * as moment from 'moment';
import {MailService} from '../service/mail.service';
import {I18nService} from '../../shared/service/i18n.service';
import {CartDataActions} from '../actions/cart-data.actions';
import {PaypalOrderActions} from '../../shared/actions/paypal-order.actions';
import {map, mergeMap, tap} from 'rxjs/operators';

@Injectable()
export class PaypalOrderEffects {

  constructor(private actions: Actions,
              private mailService: MailService,
              private i18nService: I18nService,
              private paypalOrderRestService: PaypalOrderRestService,
              private paypalRestService: PaypalRestService) {}

  @Effect()
  getAll: Observable<Action> = this.actions.ofType(PaypalOrderActions.GET_ALL_FOR_USER)
    .pipe(
      mergeMap((action: PaypalOrderActions.GetAllForUser) => this.paypalOrderRestService.listAllByUser(action.userId)),
      map(entities => new PaypalOrderActions.GetAllForUserSuccess(entities))
    );

  @Effect()
  payment: Observable<Action> = this.actions.ofType(CartDataActions.PAY)
    .pipe(
      mergeMap((action: CartDataActions.Pay) => {

        return this.paypalRestService.executePayment(action.paymentID, action.payerID).map(response => {
          const firstTx = response.transactions[0];
          const items = firstTx.item_list.items;
          const amount = firstTx.amount;

          const paypalOrder = new PaypalOrder();
          paypalOrder.userId = action.userId;
          paypalOrder.orderDate = moment().format('YYYY-MM-DD hh:mm:ss');
          paypalOrder.json = JSON.stringify({items, amount});
          return paypalOrder;
        });
      }),
      mergeMap(paypalOrder => this.paypalOrderRestService.save(paypalOrder).map(() => paypalOrder)),
      tap(paypalOrder => {
        // Send mail to admin
        let mail: Mail = new Mail('ADMIN_PAYMENT_CONFIRMATION');
        mail.parameters = {paypalOrder};
        this.mailService.sendMail(mail).subscribe(() => {
          console.log('Mail sent !');
        });
        // Send mail to client
        mail = new Mail('USER_PAYMENT_CONFIRMATION');
        mail.parameters = {paypalOrder : paypalOrder, language: this.i18nService.currentLanguage};
        this.mailService.sendMail(mail).subscribe(() => {
          console.log('Mail sent !');
        });
      }),
      map(_ => new CartDataActions.PaySuccess())
    );
}
