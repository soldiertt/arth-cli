import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';

@Component({
    templateUrl: 'home-news.component.html',
    styleUrls: ['home-news.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, I18nPipe]
})
export class HomeNewsComponent  {
  private route = inject(ActivatedRoute);


  type: string;

  constructor() {
    const route = this.route;

    this.type = route.snapshot.queryParams['type'];
  }

}
