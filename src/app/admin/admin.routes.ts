import {Routes} from '@angular/router';
import {AdminComponent} from './components/admin.component';
import {ProductComponent} from './components/product/list/product.component';
import {CategoryComponent} from './components/category/list/category.component';
import {SlideComponent} from './components/slide/list/slide.component';
import {BrandComponent} from './components/brand/list/brand.component';
import {AdminGuard} from './service/admin.guard';

export const adminRouterConfig: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {path: 'products', component: ProductComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'slides', component: SlideComponent},
      {path: 'brands', component: BrandComponent}
    ]
  }
];

