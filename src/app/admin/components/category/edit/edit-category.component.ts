import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromCategory from '../../../reducers/category.reducer';
import * as actions from '../../../actions/category.actions';
import {Store} from '@ngrx/store';
import Category from '../../../../shared/model/category.class';

@Component({
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent {

  id: string;
  item: Category;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromCategory.State>) {

    this.route.params.combineLatest(this.store.select(fromCategory.selectAll))
      .subscribe((results: [any, Category[]]) => {
        if (results[0].id) {
          this.id = results[0].id;
          this.item = Object.assign({}, results[1].find(category => {
            return category.id === this.id;
          }));
        } else {
          this.item = new Category();
        }
      });
  }

  save(valid: boolean) {
    if (valid) {
      if (this.item.id) {
        this.store.dispatch(new actions.Update(this.id, this.item));
      } else {
        this.store.dispatch(new actions.Create(this.item));
      }
      this.router.navigate(['/admin/categories']);
    }
  }
}
