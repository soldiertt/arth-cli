import {Component, input, ChangeDetectionStrategy} from '@angular/core';
import ProductItemData from '../../model/product-item-data.class';

import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-static-content-category',
    templateUrl: 'static-content-category.component.html',
    styleUrls: ['./static-content-category.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [I18nPipe]
})
export class StaticContentCategoryComponent {

  readonly current = input.required<ProductItemData>();

}
