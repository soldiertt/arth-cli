import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {AdminModule} from './admin/admin.module';
import {AppComponent} from './app.component';
import {AuthenticationEffects} from './root/effects/auth.effects';
import {UserProfileEffects} from './root/effects/user-profile.effects';
import AppState from './root/model/app-state';
import {FromProfile} from './root/reducers/user-profile.reducer';
import {WebsiteModule} from './website/website.module';

registerLocaleData(localeFr);

export const rootReducers: ActionReducerMap<AppState> = {
  profile: FromProfile.reducer
};

@NgModule({
  imports     : [
    AdminModule,
    EffectsModule.forRoot([
      AuthenticationEffects,
      UserProfileEffects
    ]),
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    StoreModule.forRoot(rootReducers),
    WebsiteModule
  ],
  declarations: [
    AppComponent
  ],
  providers   : [
    { provide: LOCALE_ID, useValue: 'fr-BE' }
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
