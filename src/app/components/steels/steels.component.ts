import {Component, OnInit} from "@angular/core";

declare var $:any;

@Component({
  selector: 'arth-steels',
  templateUrl: 'steels.component.html'
})
export class SteelsComponent implements OnInit {
  ngOnInit() {
    $('html,body').animate({ scrollTop: 0 }, 0);
  }
}
