import {Component, OnInit, Input} from "@angular/core";
import {Router} from "@angular/router";
import Category from "../../model/category.class";
import {CategoryRestService} from "../../service/category.rest.service";
import {DataService} from '../../service/data.service';

@Component({
  selector: 'arth-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  rootCategories: Category[];

  constructor (private dataService: DataService,
               private categoryRestService: CategoryRestService,
               private router: Router) {}

  ngOnInit(): void {
    this.dataService.appData.subscribe(appData => {
      this.rootCategories = appData.rootCategories;
    });
  }

  goToCateg($event, category: Category) {
    $event.preventDefault();
    this.categoryRestService.listSubCategories(category.name).subscribe(subCategories => {
      if (subCategories.length > 0) {
        this.router.navigate(['/parent-categ', category.name]);
      } else {
        this.router.navigate(['/categ', category.name]);
      }
    });
  }

}
