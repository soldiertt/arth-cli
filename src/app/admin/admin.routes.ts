import {Routes} from '@angular/router';
import {AdminComponent} from './components/admin.component';
import {ProductComponent} from './components/product/list/product.component';
import {CategoryComponent} from './components/category/list/category.component';
import {SlideComponent} from './components/slide/list/slide.component';
import {BrandComponent} from './components/brand/list/brand.component';
import {VideoComponent} from './components/video/list/video.component';
import {AdminGuard} from './service/admin.guard';
import {OrderComponent} from './components/order/list/order.component';
import {UserComponent} from './components/user/list/user.component';

export const adminRouterConfig: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {path: 'products', component: ProductComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'slides', component: SlideComponent},
      {path: 'videos', component: VideoComponent},
      {path: 'brands', component: BrandComponent},
      {path: 'orders', component: OrderComponent},
      {path: 'users', component: UserComponent}
    ]
  }
];

