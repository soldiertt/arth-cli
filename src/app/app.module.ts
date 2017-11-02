import {NgModule, LOCALE_ID} from '@angular/core'
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {AdminModule} from './admin/admin.module';
import {WebsiteModule} from './website/website.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports     : [
    AdminModule,
    RouterModule.forRoot([]),
    WebsiteModule
  ],
  providers   : [
    { provide: LOCALE_ID, useValue: "fr-BE" }
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
