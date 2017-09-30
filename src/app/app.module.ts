import {NgModule, LOCALE_ID} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {Auth0Service} from "./service/auth.service";
import {SessionService} from "./service/session.service";
import {CartService} from "./service/cart.service";
import {CategoryRestService} from "./service/category.rest.service";
import {I18nService} from "./i18n/i18n.service";
import {I18nPipe} from "./i18n/i18n.pipe";
import {CategoryTitlePipe} from "./i18n/category-title.pipe";
import {HeaderComponent} from "./components/shared/header/header.component";
import {FooterComponent} from "./components/shared/footer/footer.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {SteelsComponent} from "./components/steels/steels.component";
import {CategoryDetailsComponent} from "./components/categories/category-details.component";
import {DetailComponent} from "./components/detail/detail.component";
import {BrandsComponent} from "./components/brands/brands.component";
import {BrandArticlesComponent} from "./components/brands/brand-articles.component";
import {MyCartComponent} from "./components/cart/mycart.component";
import {CategoryListComponent} from "./components/categories/category-list.component";
import {SliderComponent} from "./components/shared/slider/slider.component";
import {ArticleRestService} from "./service/article.rest.service";
import {JQueryService} from "./service/jQuery.service";
import {CartDropdownComponent} from "./components/shared/cart-dropdown/cart-dropdown.component";
import {ArticleBoxComponent} from "./components/shared/article-box/article-box.component";
import {PaypalRestService} from "./service/paypal.rest.service";
import {ErrorComponent} from "./components/shared/error/error.component";
import {PaypalOrderRestService} from "./service/paypalorder.rest.service";
import {CountryRestService} from "./service/country.rest.service";
import {UserRestService} from "./service/user.rest.service";
import {CartBreadcrumbComponent} from "./components/cart/cart-breadcrumb.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileEmailComponent} from "./components/profile/profile-email.component";
import {ProfileEditComponent} from "./components/profile/profile-edit.component";
import {CartWizardComponent} from "./components/cart/cart-wizard.component";
import {environment} from "../environments/environment";
import {SearchComponent} from "./components/search/search.component";
import {ProfileDisplayComponent} from "./components/profile/profile-display.component";
import {ConfirmAddressComponent} from "./components/cart/confirm-address.component";
import {ArthuriusEventsService} from "./service/arthurius-events.service";
import {SortPipe} from "./pipe/sort.pipe";
import {OrdersComponent} from "./components/profile/orders-component";
import {MailService} from "./service/mail.service";
import {SliderRestService} from "./service/slider.rest.service";
import {TopSalesComponent} from "./components/shared/topsales/topsales.component";
import {CartNavigationComponent} from "./components/cart/cart-navigation.component";
import {DataService} from './service/data.service';
import {ProfileService} from './service/profile.service';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ArticleBoxComponent,
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
    I18nPipe,
    MyCartComponent,
    OrdersComponent,
    ProfileEditComponent,
    ProfileComponent,
    ProfileEmailComponent,
    SliderComponent,
    SearchComponent,
    SteelsComponent,
    SortPipe,
    TopSalesComponent
  ],
  imports     : [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig)],
  providers   : [
    ArthuriusEventsService,
    ArticleRestService,
    Auth0Service,
    CategoryRestService,
    CartService,
    CountryRestService,
    DataService,
    I18nService,
    JQueryService,
    MailService,
    PaypalOrderRestService,
    PaypalRestService,
    ProfileService,
    SessionService,
    SliderRestService,
    UserRestService,
    { provide: LOCALE_ID, useValue: "fr-BE" },
    { provide: 'REST_ENDPOINT', useValue: environment.restEndpoint}
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
