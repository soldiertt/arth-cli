import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import Article from "../../../shared/model/article.class";
import Brand from "../../../shared/model/brand.class";
import {ArticleRestService} from "../../../shared/service/rest/article.rest.service";

@Component({
  selector:'arth-brand-articles',
  templateUrl: 'brand-articles.component.html'
})
export class BrandArticlesComponent implements OnInit {
  articles: Article[];
  brand: Brand;

  constructor(private route:ActivatedRoute,
              private articleRestService: ArticleRestService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let brandName = params['type'];
      this.brand = new Brand();
      this.brand.marque = brandName;
      this.articleRestService.findByBrand(brandName).subscribe(articles => {
        this.articles = articles;
      });
    });
  }

}
