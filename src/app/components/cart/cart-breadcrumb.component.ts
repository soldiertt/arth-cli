import {Component, OnInit} from "@angular/core";
import {DataService} from '../../service/data.service';
@Component({
  selector: 'arth-cart-breadcrumb',
  templateUrl: 'cart-breadcrumb.component.html',
  styleUrls: ['cart-breadcrumb.component.css']
})
export class CartBreadcrumbComponent implements OnInit {

  currentStep: number;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.appData.subscribe(appData => {
      this.currentStep = appData.cartData.currentStep;
    });
  }
}
