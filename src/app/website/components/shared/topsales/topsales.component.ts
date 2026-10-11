import {Component, Input} from '@angular/core';
import Article from '../../../../shared/model/article.class';

import { ArticleBoxComponent } from '../article-box/article-box.component';
import { I18nPipe } from '../../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-topsales',
    templateUrl: './topsales.component.html',
    imports: [ArticleBoxComponent, I18nPipe]
})
export class TopSalesComponent {

  @Input() articles: Article[];

  constructor() {}

}
