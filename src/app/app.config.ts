import {ApplicationConfig, LOCALE_ID, importProvidersFrom} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState, provideStore} from '@ngrx/store';
import {provideToastr} from 'ngx-toastr';
import {LightboxModule} from '@pierresh/ngx-lightbox';
import {environment} from '../environments/environment';

import {websiteRouterConfig} from './website/website.routes';
import {adminRouterConfig} from './admin/admin.routes';

import {FromProfile} from './root/reducers/user-profile.reducer';
import {reducers as siteReducers} from './website/reducers';
import {reducers as adminReducers} from './admin/reducers';

import {AuthenticationEffects} from './root/effects/auth.effects';
import {UserProfileEffects} from './root/effects/user-profile.effects';
import {BrandEffects} from './shared/effects/brand.effects';
import {CategoryEffects} from './shared/effects/category.effects';
import {SlideEffects} from './shared/effects/slide.effects';
import {SlideProductEffects} from './shared/effects/slide-product.effects';
import {VideoEffects} from './shared/effects/video.effects';
import {OrderEffects} from './shared/effects/paypal-order.effects';
import {AdvancedProductEffects as WebsiteAdvancedProductEffects} from './website/effects/advanced-product.effects';
import {CartEffects} from './website/effects/cart.effects';
import {PaypalOrderEffects} from './website/effects/paypal-order.effects';
import {ProductEffects as WebsiteProductEffects} from './website/effects/product.effects';
import {AdvancedProductEffects as AdminAdvancedProductEffects} from './admin/effects/advanced-product.effects';
import {ProductEffects as AdminProductEffects} from './admin/effects/product.effects';
import {SteelEffects} from './admin/effects/steel.effects';
import {UserEffects} from './admin/effects/user.effects';

import {ArthuriusEventsService} from './shared/service/arthurius-events.service';
import {Auth0Service} from './shared/service/auth.service';
import {I18nService} from './shared/service/i18n.service';
import {PictureService} from './shared/service/picture.service';
import {SessionService} from './shared/service/session.service';
import {UploadService} from './shared/service/upload.service';
import {JQueryService} from './website/service/jQuery.service';
import {MailService} from './website/service/mail.service';

import {AdvancedArticleRestService} from './shared/service/rest/advanced-article.rest.service';
import {ArticleRestService} from './shared/service/rest/article.rest.service';
import {BrandRestService} from './shared/service/rest/brand.rest.service';
import {CategoryRestService} from './shared/service/rest/category.rest.service';
import {CountryRestService} from './shared/service/rest/country.rest.service';
import {PaypalOrderRestService} from './shared/service/rest/paypalorder.rest.service';
import {PaypalRestService} from './shared/service/rest/paypal.rest.service';
import {SliderRestService} from './shared/service/rest/slider.rest.service';
import {SteelRestService} from './shared/service/rest/steel.rest.service';
import {UserRestService} from './shared/service/rest/user.rest.service';
import {VideoRestService} from './shared/service/rest/video.rest.service';
import {RequestInterceptor} from './shared/service/rest/request-interceptor';

import {AuthGuard} from './website/service/auth.guard';
import {AdminGuard} from './admin/service/admin.guard';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-BE'},

    provideRouter([...websiteRouterConfig, ...adminRouterConfig]),

    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},

    provideStore({profile: FromProfile.reducer}),
    provideState('site', siteReducers),
    provideState('admin', adminReducers),
    provideEffects([
      AuthenticationEffects,
      UserProfileEffects,
      BrandEffects,
      CategoryEffects,
      SlideEffects,
      SlideProductEffects,
      VideoEffects,
      OrderEffects,
      WebsiteAdvancedProductEffects,
      CartEffects,
      PaypalOrderEffects,
      WebsiteProductEffects,
      AdminAdvancedProductEffects,
      AdminProductEffects,
      SteelEffects,
      UserEffects
    ]),

    importProvidersFrom(LightboxModule),

    AuthGuard,
    AdminGuard,

    ArthuriusEventsService,
    Auth0Service,
    I18nService,
    PictureService,
    SessionService,
    UploadService,
    JQueryService,
    MailService,

    AdvancedArticleRestService,
    ArticleRestService,
    BrandRestService,
    CategoryRestService,
    CountryRestService,
    PaypalOrderRestService,
    PaypalRestService,
    SliderRestService,
    SteelRestService,
    UserRestService,
    VideoRestService,

    {provide: 'REST_ENDPOINT', useValue: environment.restEndpoint}
  ]
};
