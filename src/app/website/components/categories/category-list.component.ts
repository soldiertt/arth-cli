import {Component, OnInit} from "@angular/core";
import Category from "../../../shared/model/category.class";
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {FromCategory} from '../../reducers/category.reducer';

@Component({
  selector: 'arth-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  rootCategories$: Observable<Category[]>;

  constructor (private store: Store<FromCategory.State>) {}

  ngOnInit(): void {

    this.rootCategories$ = this.store.select(FromCategory.selectAll);
  }

}
