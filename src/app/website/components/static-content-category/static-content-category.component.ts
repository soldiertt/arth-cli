import {Component, Input} from '@angular/core';
import ProductItemData from '../../model/product-item-data.class';

@Component({
  selector: 'arth-static-content-category',
  templateUrl: 'static-content-category.component.html',
  styleUrls: ['./static-content-category.component.css']
})
export class StaticContentCategoryComponent {

  @Input() current: ProductItemData;

}
