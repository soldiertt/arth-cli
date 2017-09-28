import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import Category from "../../../model/category.class";
import {Auth0Service} from "../../../service/auth.service";
import {CategoryRestService} from "../../../service/category.rest.service";
import {I18nService} from "../../../i18n/i18n.service";

@Component({
  selector: 'arth-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  rootCategories: Category[];
  searchTerm: string;

  constructor (public authService: Auth0Service,
               private categoryRestService: CategoryRestService,
               private router: Router,
               public i18nService: I18nService) {}

  ngOnInit(): void {
    this.categoryRestService.listAllRoots().subscribe(categories => {
      this.rootCategories = categories;
    });
  }

  goToCateg($event, category: Category) {
    $event.preventDefault();
    this.categoryRestService.listSubCategories(category.name).subscribe(subCategories => {
      if (subCategories.length > 0) {
        this.router.navigate(['/parent-categ', category.name]);
      } else {
        this.router.navigate(['/categ', category.name]);
      }
    });
  }

  isHome(): boolean {
    return this.router.isActive('', true);
  }

  search(): void {
    this.router.navigate(['search', this.searchTerm]);
  }
}
