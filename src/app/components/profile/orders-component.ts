import {Component, OnInit} from "@angular/core";
import PaypalOrder from "../../model/paypalorder.class";
import {PaypalOrderRestService} from "../../service/paypalorder.rest.service";
import {DataService} from '../../service/data.service';
@Component({
  selector: 'arth-orders',
  templateUrl: './orders-component.html'
})
export class OrdersComponent implements OnInit {

  paypalOrders: PaypalOrder[];

  constructor(private paypalOrderRestService: PaypalOrderRestService,
              private dataService: DataService) {}

  ngOnInit() {
    this.dataService.appData.subscribe(appData => {
      if (appData.profile) {
        this.paypalOrderRestService.listAllByUser(appData.profile.user_id).subscribe((orders) => {
          this.paypalOrders = orders;
          this.paypalOrders.forEach(paypalOrder => {
            paypalOrder.parsedJson = JSON.parse(paypalOrder.json);
          })
        });
      }
    });
  }

}
