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
import {ParentCategoryComponent} from "./components/categories/parent-category.component";
import {CategArticlesComponent} from "./components/categories/categ-articles.component";
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
import {PaymentConfirmComponent} from "./components/cart/paymentconfirm.component";
import {PaypalRestService} from "./service/paypal.rest.service";
import {ErrorComponent} from "./components/shared/error/error.component";
import {PaypalOrderRestService} from "./service/paypalorder.rest.service";
import {CountryRestService} from "./service/country.rest.service";
import {UserRestService} from "./service/user.rest.service";
import {CartWizardBreadcrumbComponent} from "./components/cart/cart-wizard-breadcrumb.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileEmailComponent} from "./components/profile/profile-email.component";
import {ProfileAddressComponent} from "./components/profile/profile-address.component";
import {CartWizardComponent} from "./components/cart/cart-wizard.component";
import {environment} from "../environments/environment";
import {SearchComponent} from "./components/search/search.component";
import {DisplayAddressComponent} from "./components/profile/display-address.component";
import {ConfirmAddressComponent} from "./components/cart/confirm-address.component";
import {ArthuriusEventsService} from "./service/arthurius-events.service";
import {SortPipe} from "./pipe/sort.pipe";
import {OrdersComponent} from "./components/profile/orders-component";
import {MailService} from "./service/mail.service";

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ArticleBoxComponent,
    BrandArticlesComponent,
    BrandsComponent,
    CategArticlesComponent,
    CategoryTitlePipe,
    CartWizardComponent,
    CartDropdownComponent,
    CartWizardBreadcrumbComponent,
    CategoryListComponent,
    ConfirmAddressComponent,
    DetailComponent,
    DisplayAddressComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    I18nPipe,
    MyCartComponent,
    OrdersComponent,
    ParentCategoryComponent,
    PaymentConfirmComponent,
    ProfileAddressComponent,
    ProfileComponent,
    ProfileEmailComponent,
    SliderComponent,
    SearchComponent,
    SteelsComponent,
    SortPipe
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
    I18nService,
    JQueryService,
    MailService,
    PaypalOrderRestService,
    PaypalRestService,
    SessionService,
    UserRestService,
    { provide: LOCALE_ID, useValue: "fr-BE" },
    { provide: 'REST_ENDPOINT', useValue: environment.restEndpoint}
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
