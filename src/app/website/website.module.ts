import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LightboxModule} from 'ngx-lightbox';
import {RestModule} from '../shared/rest.module';
import {AuthCallbackComponent} from './components/authcallback/auth-callback.component';
import {HomemadeKnivesComponent} from './components/homemadeknives/homemade-knives.component';
import {AdvancedArticleBoxComponent} from './components/shared/advanced-article-box/advanced-article-box.component';
import {AdvancedProductEffects} from './effects/advanced-product.effects';
import {websiteRouterConfig} from './website.routes';
import {TruncatePipe} from './pipe/truncate.pipe';
import {TopSalesComponent} from './components/shared/topsales/topsales.component';
import {SortPipe} from './pipe/sort.pipe';
import {SteelsComponent} from './components/steels/steels.component';
import {SearchComponent} from './components/search/search.component';
import {SliderComponent} from './components/shared/slider/slider.component';
import {ProfileEmailComponent} from './components/profile/profile-email.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileEditComponent} from './components/profile/profile-edit.component';
import {OrdersComponent} from './components/profile/orders-component';
import {MyCartComponent} from './components/cart/mycart.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {WebsiteComponent} from './components/website.component';
import {CategoryListComponent} from './components/categories/category-list.component';
import {CartBreadcrumbComponent} from './components/cart/cart-breadcrumb.component';
import {CartNavigationComponent} from './components/cart/cart-navigation.component';
import {CategoryTitlePipe} from './pipe/category-title.pipe';
import {CategoryDetailsComponent} from './components/categories/category-details.component';
import {BrandsComponent} from './components/brands/brands.component';
import {BrandArticlesComponent} from './components/brands/brand-articles.component';
import {ArticleBoxComponent} from './components/shared/article-box/article-box.component';
import {AboutComponent} from './components/about/about.component';
import {CartWizardComponent} from './components/cart/cart-wizard.component';
import {CartDropdownComponent} from './components/shared/cart-dropdown/cart-dropdown.component';
import {ConfirmAddressComponent} from './components/cart/confirm-address.component';
import {DetailComponent} from './components/detail/detail.component';
import {ProfileDisplayComponent} from './components/profile/profile-display.component';
import {ErrorComponent} from './components/shared/error/error.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {MailService} from './service/mail.service';
import {JQueryService} from './service/jQuery.service';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './service/auth.guard';
import {SharedServicesModule} from '../shared/shared-services.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {PaypalOrderEffects} from './effects/paypal-order.effects';
import {CartEffects} from './effects/cart.effects';
import {BrandEffects} from '../shared/effects/brand.effects';
import {CategoryEffects} from '../shared/effects/category.effects';
import {SlideEffects} from '../shared/effects/slide.effects';
import {SlideProductEffects} from '../shared/effects/slide-product.effects';
import {ProductEffects} from './effects/product.effects';

@NgModule({
  declarations: [
    AboutComponent,
    AdvancedArticleBoxComponent,
    ArticleBoxComponent,
    AuthCallbackComponent,
    BrandArticlesComponent,
    BrandsComponent,
    CategoryDetailsComponent,
    CategoryTitlePipe,
    CartNavigationComponent,
    CartWizardComponent,
    CartDropdownComponent,
    CartBreadcrumbComponent,
    CategoryListComponent,
    ConfirmAddressComponent,
    DetailComponent,
    ProfileDisplayComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    HomemadeKnivesComponent,
    MyCartComponent,
    OrdersComponent,
    ProfileEditComponent,
    ProfileComponent,
    ProfileEmailComponent,
    SliderComponent,
    SearchComponent,
    SteelsComponent,
    SortPipe,
    TopSalesComponent,
    TruncatePipe,
    WebsiteComponent
  ],
  imports     : [
    EffectsModule.forFeature([
      AdvancedProductEffects,
      BrandEffects,
      CartEffects,
      CategoryEffects,
      PaypalOrderEffects,
      ProductEffects,
      SlideEffects,
      SlideProductEffects
    ]),
    LightboxModule,
    RestModule,
    RouterModule.forChild(websiteRouterConfig),
    SharedModule,
    SharedServicesModule,
    StoreModule.forFeature('site', reducers)
  ],
  providers   : [
    AuthGuard,
    JQueryService,
    MailService
  ],
})
export class WebsiteModule {

}
