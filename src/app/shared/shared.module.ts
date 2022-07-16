import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  exports : [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [
  ]
})
export class SharedModule {

}
