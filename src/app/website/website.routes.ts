import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {BrandsComponent} from './components/brands/brands.component';
import {DetailComponent} from './components/detail/detail.component';
import {CategoryDetailsComponent} from './components/categories/category-details.component';
import {BrandArticlesComponent} from './components/brands/brand-articles.component';
import {SteelsComponent} from './components/steels/steels.component';
import {ErrorComponent} from './components/shared/error/error.component';
import {CartWizardComponent} from './components/cart/cart-wizard.component';
import {SearchComponent} from './components/search/search.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WebsiteComponent} from './components/website.component';
import {AuthGuard} from './service/auth.guard';

export const websiteRouterConfig: Routes = [
  {
    path: '', component: WebsiteComponent,
    children: [
      {path: '', pathMatch: 'full', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'brands', component: BrandsComponent},
      {path: 'brand/:type', component: BrandArticlesComponent},
      {path: 'categ/:type', component: CategoryDetailsComponent},
      {path: 'detail/:articleId', component: DetailComponent},
      {path: 'error', component: ErrorComponent},
      {path: 'mycart', component: CartWizardComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      {path: 'search/:term', component: SearchComponent},
      {path: 'steels', component: SteelsComponent}
    ]
  }
];

