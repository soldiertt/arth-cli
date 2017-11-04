import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromSlide from '../../../reducers/slide.reducer';
import Slide from '../../../../shared/model/slider.class';
import * as actions from '../../../actions/slide.actions';

declare var $:any;

@Component({
  selector: 'arth-admin-slide-modal',
  templateUrl: './edit-slide.component.html'
})
export class EditSlideComponent {

  @Input() item: Slide;

  constructor(private store: Store<fromSlide.State>) { }

  save(valid: boolean) {
    if (valid) {
      if (this.item.id) {
        this.store.dispatch(new actions.Update(this.item.id, this.item));
      } else {
        this.store.dispatch(new actions.Create(this.item));
      }
      $('#slideModal').modal('hide');
    }
  }
}
