import {Component, input, ChangeDetectionStrategy} from '@angular/core';
import Article from '../../../../shared/model/article.class';

import { ArticleBoxComponent } from '../article-box/article-box.component';
import { I18nPipe } from '../../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-topsales',
    templateUrl: './topsales.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ArticleBoxComponent, I18nPipe]
})
export class TopSalesComponent {

  readonly articles = input<Article[]>();

  constructor() {}

}
