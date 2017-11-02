import {Routes} from '@angular/router';
import {AdminComponent} from './components/admin.component';
import {ProductComponent} from './components/product/list/product.component';
import {CategoryComponent} from './components/category/list/category.component';
import {SlideComponent} from './components/slide/list/slide.component';
import {BrandComponent} from './components/brand/list/brand.component';
import {EditProductComponent} from './components/product/edit/edit-product.component';
import {EditBrandComponent} from './components/brand/edit/edit-brand.component';
import {EditSlideComponent} from './components/slide/edit/edit-slide.component';
import {EditCategoryComponent} from './components/category/edit/edit-category.component';
import {AdminGuard} from './service/admin.guard';

export const adminRouterConfig: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {path: 'products', component: ProductComponent,
        children: [
          {path: 'edit/:id', component: EditProductComponent},
          {path: 'add', component: EditProductComponent}
        ]
      },
      {path: 'categories', component: CategoryComponent,
        children: [
          {path: 'edit/:id', component: EditCategoryComponent},
          {path: 'add', component: EditCategoryComponent}
        ]
      },
      {path: 'slides', component: SlideComponent,
        children: [
          {path: 'edit/:id', component: EditSlideComponent},
          {path: 'add', component: EditSlideComponent}
        ]
      },
      {path: 'brands', component: BrandComponent,
        children: [
          {path: 'edit/:id', component: EditBrandComponent},
          {path: 'add', component: EditBrandComponent}
        ]
      }
    ]
  }
];

