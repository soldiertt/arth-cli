import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromSlide from '../../../reducers/slide.reducer';
import Slide from '../../../../shared/model/slider.class';
import * as actions from '../../../actions/slide.actions';

@Component({
  templateUrl: './edit-slide.component.html'
})
export class EditSlideComponent {

  id: string;
  item: Slide;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromSlide.State>) {

    this.route.params.combineLatest(this.store.select(fromSlide.selectAll))
      .subscribe((results: [any, Slide[]]) => {
        if (results[0].id) {
          this.id = results[0].id;
          this.item = Object.assign({}, results[1].find(slide => {
            return slide.id === this.id;
          }));
        } else {
          this.item = new Slide();
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
      this.router.navigate(['/admin/slides']);
    }
  }
}
