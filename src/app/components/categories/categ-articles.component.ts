import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import Article from "../../model/article.class";
import Category from "../../model/category.class";
import {ArticleRestService} from "../../service/article.rest.service";
import {CategoryRestService} from "../../service/category.rest.service";

declare var $:any

@Component({
  selector:'arth-categ-articles',
  templateUrl: 'categ-articles.component.html',
  styleUrls: ['categ-articles.component.css']
})
export class CategArticlesComponent implements OnInit {
  articles: Article[];
  category: Category;
  parentCategory: Category;
  _orderBy: string = "name";

  constructor(private activeRoute:ActivatedRoute,
              private articleRestService: ArticleRestService,
              private categoryRestService: CategoryRestService) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      $('html,body').animate({ scrollTop: 0 }, 0);
      let categoryType = params['type'];
      this.categoryRestService.findCategory(categoryType).subscribe(category => {
        this.category = category;
        if (category.parent) {
          this.categoryRestService.findCategory(category.parent).subscribe(parentCategory => {
            this.parentCategory = parentCategory;
          });
        } else {
          this.parentCategory = undefined;
        }
      });
      this.articleRestService.findByCategory(categoryType).subscribe(articles => {
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
