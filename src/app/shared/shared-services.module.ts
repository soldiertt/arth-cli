import {NgModule} from '@angular/core'
import {SessionService} from './service/session.service';
import {ArthuriusEventsService} from './service/arthurius-events.service';
import {I18nService} from './service/i18n.service';
import {Auth0Service} from './service/auth.service';
import {I18nPipe} from './i18n/i18n.pipe';
import {UploadService} from './service/upload.service';

@NgModule({
  declarations: [
    I18nPipe
  ],
  exports: [
    I18nPipe
  ],
  providers   : [
    ArthuriusEventsService,
    Auth0Service,
    I18nService,
    SessionService,
    UploadService
  ]
})
export class SharedServicesModule {

}
