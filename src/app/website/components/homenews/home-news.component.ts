import {ChangeDetectionStrategy, Component} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    templateUrl: 'home-news.component.html',
    styleUrls: ['home-news.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, NgIf, I18nPipe]
})
export class HomeNewsComponent  {

  type: string;

  constructor(private route: ActivatedRoute) {
    this.type = route.snapshot.queryParams['type'];
  }

}
