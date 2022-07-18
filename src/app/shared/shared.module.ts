import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {LuxonModule} from 'luxon-angular';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  exports : [
    BrowserModule,
    FormsModule,
    LuxonModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  imports: [
    ToastrModule.forRoot()
  ]
})
export class SharedModule {

}
