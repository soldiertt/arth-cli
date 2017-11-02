import {Component, OnInit} from "@angular/core";
import {ArticleRestService} from "../../../shared/service/rest/article.rest.service";
import {ActivatedRoute} from "@angular/router";
import Article from "../../../shared/model/article.class";
@Component({
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  searchTerm: string;
  articles: Article[];
  _orderBy: string = "name";

  constructor(private articleRestService: ArticleRestService,
    private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
      this.articleRestService.search(this.searchTerm).subscribe(articles => {
        this.articles = articles;
      });
    });
  }

  get orderBy() {
    return this._orderBy;
  }

  set orderBy(value: string) {
    this._orderBy = value;
  }
}
