import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LuxonModule} from 'luxon-angular';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  exports : [
    BrowserAnimationsModule,
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
