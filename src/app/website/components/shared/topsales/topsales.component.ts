import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import Article from "../../../../shared/model/article.class";
import Category from "../../../../shared/model/category.class";
import {ArticleRestService} from "../../../../shared/service/rest/article.rest.service";
@Component({
  selector: 'arth-topsales',
  templateUrl: './topsales.component.html',
  styleUrls: ['./topsales.component.css']
})
export class TopSalesComponent implements OnChanges {

  @Input() category: Category;

  articles: Article[];

  constructor(private articleRestService: ArticleRestService) {}

  ngOnChanges(changes: SimpleChanges) {
    this._updateTopSales();
  }

  private _updateTopSales() {
    this.articleRestService.findTopSalesByCategory(this.category.name).subscribe(articles => {
      this.articles = articles;
    });
  }

}
