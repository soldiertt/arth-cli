import {Component, Input} from '@angular/core';
import ProductItemData from '../../model/product-item-data.class';
import { NgIf } from '@angular/common';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';

@Component({
    selector: 'arth-static-content-category',
    templateUrl: 'static-content-category.component.html',
    styleUrls: ['./static-content-category.component.css'],
    imports: [NgIf, I18nPipe]
})
export class StaticContentCategoryComponent {

  @Input() current: ProductItemData;

}
