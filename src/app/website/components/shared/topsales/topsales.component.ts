import {Component, Input} from "@angular/core";
import Article from "../../../../shared/model/article.class";
@Component({
  selector: 'arth-topsales',
  templateUrl: './topsales.component.html'
})
export class TopSalesComponent {

  @Input() articles: Article[];

  constructor() {}

}
