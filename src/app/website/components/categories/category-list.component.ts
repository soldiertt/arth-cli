import {Component, OnInit} from "@angular/core";
import Category from "../../../shared/model/category.class";
import {DataService} from '../../service/data.service';

@Component({
  selector: 'arth-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  rootCategories: Category[];

  constructor (private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.appData.subscribe(appData => {
      this.rootCategories = appData.rootCategories;
    });
  }

}
