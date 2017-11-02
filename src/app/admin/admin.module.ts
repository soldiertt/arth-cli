import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AdminComponent} from './components/admin.component';
import {adminRouterConfig} from './admin.routes';
import {RouterModule} from '@angular/router';
import {RestModule} from '../shared/rest.module';
import {ProductEffects} from './effects/product.effects';
import {SharedModule} from '../shared/shared.module';
import {BrandEffects} from './effects/brand.effects';
import {reducers} from './reducers/index';
import {ProductComponent} from './components/product/list/product.component';
import {SlideComponent} from './components/slide/list/slide.component';
import {BrandComponent} from './components/brand/list/brand.component';
import {CategoryComponent} from './components/category/list/category.component';
import {EditProductComponent} from './components/product/edit/edit-product.component';
import {EditBrandComponent} from './components/brand/edit/edit-brand.component';
import {EditSlideComponent} from './components/slide/edit/edit-slide.component';
import {EditCategoryComponent} from './components/category/edit/edit-category.component';
import {CategoryEffects} from './effects/category.effects';
import {SlideEffects} from './effects/slide.effects';
import {AdminMenuComponent} from './components/menu/menu.component';
import {SharedServicesModule} from '../shared/shared-services.module';
import {AdminGuard} from './service/admin.guard';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    BrandComponent,
    CategoryComponent,
    EditBrandComponent,
    EditCategoryComponent,
    EditProductComponent,
    EditSlideComponent,
    ProductComponent,
    SlideComponent
  ],
  imports     : [
    SharedModule,
    SharedServicesModule,
    EffectsModule.forRoot([ProductEffects, BrandEffects, CategoryEffects, SlideEffects]),
    RestModule,
    RouterModule.forChild(adminRouterConfig),
    StoreModule.forRoot(reducers)
  ],
  providers   : [
    AdminGuard
  ]
})
export class AdminModule {

}
