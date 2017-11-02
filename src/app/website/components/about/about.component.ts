import {Component, OnInit} from "@angular/core";

declare var $:any;

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    $('html,body').animate({ scrollTop: 0 }, 0);
  }
}
