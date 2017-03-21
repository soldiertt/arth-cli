import {Component, OnInit, Input} from "@angular/core";
import Article from "../../../model/article.class";
import Category from "../../../model/category.class";
import {ArticleRestService} from "../../../service/article.rest.service";
@Component({
  selector: 'arth-topsales',
  templateUrl: './topsales.component.html',
  styleUrls: ['./topsales.component.css']
})
export class TopSalesComponent implements OnInit {

  @Input() category: Category;
  @Input() categoryLevel: "leaf" | "root";

  articles: Article[];

  constructor(private articleRestService: ArticleRestService) {}

  ngOnInit() {
    if (this.categoryLevel === "leaf") {
      this.articleRestService.findTopSalesByLeafCategory(this.category.name).subscribe(articles => {
        this.articles = articles;
      });
    } else if (this.categoryLevel === "root") {
      this.articleRestService.findTopSalesByRootCategory(this.category.name).subscribe(articles => {
        this.articles = articles;
      });
    }
  }

}
