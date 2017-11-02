import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import Article from "../../../shared/model/article.class";
import Category from "../../../shared/model/category.class";
import {ArticleRestService} from "../../../shared/service/rest/article.rest.service";
import {CategoryRestService} from "../../../shared/service/rest/category.rest.service";

declare var $:any

@Component({
  selector:'arth-category-details',
  templateUrl: 'category-details.component.html',
  styleUrls: ['category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
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
        this.categoryRestService.listSubCategories(categoryType).subscribe(subCategories => {
          this.category.subCategories = subCategories;
          if (!subCategories.length) {
            this.articleRestService.findByCategory(categoryType).subscribe(articles => {
              this.articles = articles;
            });
          }
        });
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
