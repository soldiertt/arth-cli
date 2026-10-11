import {Component, OnInit} from '@angular/core';
import Category from '../../../shared/model/category.class';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FromCategory} from '../../reducers/category.reducer';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {I18nPipe} from '../../../shared/i18n/i18n.pipe';
import {CategoryTitlePipe} from '../../pipe/category-title.pipe';

@Component({
    selector: 'arth-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
    imports: [RouterLink, AsyncPipe, I18nPipe, CategoryTitlePipe]
})
export class CategoryListComponent implements OnInit {

  rootCategories$: Observable<Category[]>;

  constructor(private store: Store<FromCategory.State>) {
  }

  ngOnInit(): void {

    this.rootCategories$ = this.store.select(FromCategory.selectAll);
  }

}
