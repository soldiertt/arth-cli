import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'home-news.component.html',
  styleUrls: ['home-news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNewsComponent  {

  type: string;

  constructor(private route: ActivatedRoute) {
    this.type = route.snapshot.queryParams['type'];
  }

}
