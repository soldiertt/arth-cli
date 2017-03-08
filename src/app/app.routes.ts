import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {BrandsComponent} from "./components/brands/brands.component";
import {DetailComponent} from "./components/detail/detail.component";
import {ParentCategoryComponent} from "./components/categories/parent-category.component";
import {CategArticlesComponent} from "./components/categories/categ-articles.component";
import {BrandArticlesComponent} from "./components/brands/brand-articles.component";
import {SteelsComponent} from "./components/steels/steels.component";
import {ErrorComponent} from "./components/shared/error/error.component";
import {CartWizardComponent} from "./components/cart/cart-wizard.component";
import {SearchComponent} from "./components/search/search.component";
import {ProfileComponent} from "./components/profile/profile.component";

export const rootRouterConfig: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'brand/:type', component: BrandArticlesComponent},
  {path: 'categ/:type', component: CategArticlesComponent},
  {path: 'detail/:articleId', component: DetailComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'mycart', component: CartWizardComponent},
  {path: 'parent-categ/:type', component: ParentCategoryComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search/:term', component: SearchComponent},
  {path: 'steels', component: SteelsComponent}
];

