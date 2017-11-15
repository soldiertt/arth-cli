import {NgModule, LOCALE_ID} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';
import {WebsiteModule} from './website/website.module';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {UserProfileEffects} from './root/effects/user-profile.effects';
import {FromProfile} from './root/reducers/user-profile.reducer';
import AppState from './root/model/app-state';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeFr);

export const rootReducers: ActionReducerMap<AppState> = {
  profile: FromProfile.reducer
};

@NgModule({
  imports     : [
    AdminModule,
    EffectsModule.forRoot([
      UserProfileEffects
    ]),
    RouterModule.forRoot([]),
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
