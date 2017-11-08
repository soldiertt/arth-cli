import {NgModule, LOCALE_ID} from '@angular/core'
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {AdminModule} from './admin/admin.module';
import {WebsiteModule} from './website/website.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {userProfileReducer} from './root/reducers/user-profile.reducer';
import {UserProfileEffects} from './root/effects/user-profile.effects';

@NgModule({
  imports     : [
    AdminModule,
    EffectsModule.forRoot([
      UserProfileEffects
    ]),
    RouterModule.forRoot([]),
    StoreModule.forRoot({profile: userProfileReducer}),
    WebsiteModule
  ],
  declarations: [
    AppComponent
  ],
  providers   : [
    { provide: LOCALE_ID, useValue: "fr-BE" }
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
