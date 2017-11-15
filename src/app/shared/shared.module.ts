import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  exports : [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule
  ],
  imports: [
    ToastyModule.forRoot()
  ]
})
export class SharedModule {

}
