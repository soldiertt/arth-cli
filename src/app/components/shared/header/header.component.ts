import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import Category from "../../../model/category.class";
import {Auth0Service} from "../../../service/auth.service";
import {I18nService} from "../../../i18n/i18n.service";
import {DataService} from '../../../service/data.service';

declare var $:any;

@Component({
  selector: 'arth-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  rootCategories: Category[];
  searchTerm: string;

  constructor (public authService: Auth0Service,
               private dataService: DataService,
               private router: Router,
               public i18nService: I18nService) {}

  ngOnInit(): void {
    this.dataService.appData.subscribe(appData => {
      this.rootCategories = appData.rootCategories;
    });
  }

  ngAfterViewInit() {
    let closeNavBar = function () {
      const navbarToggler$ = $('.navbar-toggler');
      if(navbarToggler$.css('display') !='none'){
        navbarToggler$.trigger( "click" );
      }
    };

    $(function() {
      $('.nav-item:not(".dropdown") a').on('click', closeNavBar);
      $('.navbar-nav').on('click', '.dropdown-item', closeNavBar);
    });
  }

  isHome(): boolean {
    return this.router.isActive('', true);
  }

  search(): void {
    this.router.navigate(['search', this.searchTerm]);
  }
}
