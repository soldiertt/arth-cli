import {NgModule} from '@angular/core'
import {ArticleRestService} from './service/rest/article.rest.service';
import {CountryRestService} from './service/rest/country.rest.service';
import {CategoryRestService} from './service/rest/category.rest.service';
import {PaypalRestService} from './service/rest/paypal.rest.service';
import {PaypalOrderRestService} from './service/rest/paypalorder.rest.service';
import {UserRestService} from './service/rest/user.rest.service';
import {SliderRestService} from './service/rest/slider.rest.service';
import {HttpModule} from '@angular/http';
import {environment} from '../../environments/environment';
import {BrandRestService} from './service/rest/brand.rest.service';

@NgModule({
  declarations: [],
  imports     : [
    HttpModule
  ],
  providers   : [
    ArticleRestService,
    BrandRestService,
    CategoryRestService,
    CountryRestService,
    PaypalOrderRestService,
    PaypalRestService,
    SliderRestService,
    UserRestService,
    { provide: 'REST_ENDPOINT', useValue: environment.restEndpoint}
  ],
})
export class RestModule {

}
