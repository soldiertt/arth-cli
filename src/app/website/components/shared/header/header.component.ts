import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Category from '../../../../shared/model/category.class';
import {Auth0Service} from '../../../../shared/service/auth.service';
import {I18nService} from '../../../../shared/service/i18n.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CategoryActions} from '../../../../shared/actions/category.actions';
import {FromCategory} from '../../../reducers/category.reducer';
import { AsyncPipe } from '@angular/common';
import { CartDropdownComponent } from '../cart-dropdown/cart-dropdown.component';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../../../../shared/i18n/i18n.pipe';
import { CategoryTitlePipe } from '../../../pipe/category-title.pipe';

declare const $: any;

@Component({
    selector: 'arth-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    imports: [RouterLink, CartDropdownComponent, RouterLinkActive, FormsModule, AsyncPipe, I18nPipe, CategoryTitlePipe]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  authService = inject(Auth0Service);
  private store = inject<Store<FromCategory.State>>(Store);
  private router = inject(Router);
  i18nService = inject(I18nService);


  rootCategories$: Observable<Category[]>;
  searchTerm: string;

  ngOnInit(): void {
    this.rootCategories$ = this.store.select(FromCategory.selectAll);
    this.store.dispatch(CategoryActions.GetAllRoot());
  }

  ngAfterViewInit() {
    // const closeNavBar = function () {
    //   const navbarToggler$ = $('.navbar-toggler');
    //   if (navbarToggler$.css('display') !== 'none') {
    //     navbarToggler$.trigger('click');
    //   }
    // };
    //
    // setTimeout(() => {
    //   $('.nav-item:not(".dropdown") a').on('click', closeNavBar);
    //   $('.navbar-nav').on('click', '.dropdown-item', closeNavBar);
    // }, 50);
  }

  search(): void {
    this.router.navigate(['search', this.searchTerm]);
  }
}
