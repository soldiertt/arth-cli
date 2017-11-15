import {Component, OnInit} from '@angular/core';

declare const $: any;

@Component({
  selector: 'arth-steels',
  templateUrl: 'steels.component.html',
  styleUrls: ['./steels.component.css']
})
export class SteelsComponent implements OnInit {
  ngOnInit() {
    $('html,body').animate({ scrollTop: 0 }, 0);
  }
}
