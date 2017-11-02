import {Component, OnInit} from '@angular/core';
import * as fromSlide from '../../../reducers/slide.reducer';
import * as actions from '../../../actions/slide.actions';
import Slide from '../../../../shared/model/slider.class';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  templateUrl: './slide.component.html'
})
export class SlideComponent implements OnInit {

  slides$: Observable<Slide[]>;
  subRouteActive: boolean = false;

  constructor(private store: Store<fromSlide.State>, private router: Router) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.subRouteActive = (event.url.includes('/edit/') || event.url.includes('/add'));
    });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.slides$ = this.store.select(fromSlide.selectAll);
    this.store.dispatch(new actions.GetAll());
  }

  remove($event, id: number) {
    $event.preventDefault();
    this.store.dispatch(new actions.Delete(String(id)));
  }
}
