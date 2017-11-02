import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import Brand from '../../../../shared/model/brand.class';
import * as fromBrand from '../../../reducers/brand.reducer';
import * as actions from '../../../actions/brand.actions';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit {

  brands$: Observable<Brand[]>;
  subRouteActive: boolean = false;

  constructor(private store: Store<fromBrand.State>, private router: Router) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.subRouteActive = (event.url.includes('/edit/') || event.url.includes('/add'));
    });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.brands$ = this.store.select(fromBrand.selectAll);
    this.store.dispatch(new actions.GetAll());
  }

  remove($event, id: number) {
    $event.preventDefault();
    this.store.dispatch(new actions.Delete(String(id)));
  }


}
