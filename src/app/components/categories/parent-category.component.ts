import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import Category from "../../model/category.class";
import {CategoryRestService} from "../../service/category.rest.service";

@Component({
  selector:'arth-parent-category',
  templateUrl: 'parent-category.component.html',
  styleUrls: ['parent-category.component.css']
})
export class ParentCategoryComponent implements OnInit {
  parentCategory: Category;

  constructor(private activeRoute: ActivatedRoute, private categoryRestService: CategoryRestService) {}

  ngOnInit() {

    this.activeRoute.params.subscribe((params: Params) => {
      let categoryType = params['type'];
      this.categoryRestService.findCategory(categoryType).subscribe(category => {
        this.parentCategory = category;
        this.categoryRestService.listSubCategories(categoryType).subscribe(subCategories => {
          if (subCategories.length > 0) {
            this.parentCategory.hasChildren = true;
          }
          this.parentCategory.subCategories = subCategories;
        });
      });
    });
  }
}
