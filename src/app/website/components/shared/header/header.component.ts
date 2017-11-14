import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import Category from "../../../../shared/model/category.class";
import {Auth0Service} from "../../../../shared/service/auth.service";
import {I18nService} from "../../../../shared/service/i18n.service";
import {ProfileService} from '../../../service/profile.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {CategoryActions} from '../../../actions/category.actions';
import {FromCategory} from '../../../reducers/category.reducer';

declare var $:any;

@Component({
  selector: 'arth-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  rootCategories$: Observable<Category[]>;
  searchTerm: string;

  constructor (public authService: Auth0Service,
               public profileService: ProfileService,
               private store: Store<FromCategory.State>,
               private router: Router,
               public i18nService: I18nService) {}

  ngOnInit(): void {
    this.rootCategories$ = this.store.select(FromCategory.selectAll);
    this.store.dispatch(new CategoryActions.GetAllRoot());
  }

  ngAfterViewInit() {
    let closeNavBar = function () {
      const navbarToggler$ = $('.navbar-toggler');
      if(navbarToggler$.css('display') !='none'){
        navbarToggler$.trigger( "click" );
      }
    };

    setTimeout(() => {
      $('.nav-item:not(".dropdown") a').on('click', closeNavBar);
      $('.navbar-nav').on('click', '.dropdown-item', closeNavBar);
    }, 50);
  }

  isHome(): boolean {
    return this.router.isActive('', true);
  }

  search(): void {
    this.router.navigate(['search', this.searchTerm]);
  }
}
