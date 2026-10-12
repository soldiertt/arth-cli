import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PaypalOrderRestService} from '../../shared/service/rest/paypalorder.rest.service';
import {PaypalRestService} from '../../shared/service/rest/paypal.rest.service';
import Mail from '../model/mail.class';
import PaypalOrder from '../../shared/model/paypalorder.class';
import {MailService} from '../service/mail.service';
import {I18nService} from '../../shared/service/i18n.service';
import {CartDataActions} from '../actions/cart-data.actions';
import {PaypalOrderActions} from '../../shared/actions/paypal-order.actions';
import {map, catchError, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DateTime} from 'luxon';

@Injectable()
export class PaypalOrderEffects {
  private actions$ = inject(Actions);
  private mailService = inject(MailService);
  private i18nService = inject(I18nService);
  private paypalOrderRestService = inject(PaypalOrderRestService);
  private paypalRestService = inject(PaypalRestService);


  getAll$ = createEffect(() =>  this.actions$.pipe(
    ofType(PaypalOrderActions.GetAllForUser),
    mergeMap((action) => this.paypalOrderRestService.listAllByUser(action.userId)),
    map(entities => PaypalOrderActions.GetAllForUserSuccess({entities}))
    )
  );

  payment$ = createEffect(() => this.actions$.pipe(
    ofType(CartDataActions.Pay),
    mergeMap((action) => this.paypalRestService.captureOrder(action.orderID, action.userId).pipe(
      map(response => {
        const paypalOrder = new PaypalOrder();
        paypalOrder.userId = action.userId;
        paypalOrder.orderDate = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
        paypalOrder.json = JSON.stringify({items: response.items, amount: response.amount});
        return paypalOrder;
      }),
      mergeMap(paypalOrder => this.paypalOrderRestService.save(paypalOrder).pipe(
        map(() => paypalOrder))
      ),
      tap(paypalOrder => {
        // Send mail to admin
        let mail: Mail = new Mail('ADMIN_PAYMENT_CONFIRMATION');
        mail.parameters = {paypalOrder};
        this.mailService.sendMail(mail).subscribe({
          next: () => console.log('Mail sent !'),
          error: err => console.error('Mail to admin failed', err)
        });
        // Send mail to client
        mail = new Mail('USER_PAYMENT_CONFIRMATION');
        mail.parameters = {paypalOrder : paypalOrder, language: this.i18nService.currentLanguage};
        this.mailService.sendMail(mail).subscribe({
          next: () => console.log('Mail sent !'),
          error: err => console.error('Mail to client failed', err)
        });
      }),
      map(() => CartDataActions.PaySuccess()),
      catchError(err => {
        console.error('PayPal capture failed', err);
        return of(CartDataActions.PayFailure({message: 'Payment could not be completed'}));
      })
    ))
  ));
}
