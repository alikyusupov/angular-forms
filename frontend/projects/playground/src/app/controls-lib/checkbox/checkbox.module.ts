import { BaseControl } from '../../shared/base-control/base-control';
import { BrowserModule } from '@angular/platform-browser';
import { FormInjectorModule } from '../../shared/injector-pipe/injector.pipe.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormInjectorModule,
  
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }