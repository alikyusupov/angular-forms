import { CommonModule } from '@angular/common';
import { FormInjectorModule } from '../injector-pipe/injector.pipe.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormInjectorModule
  ],
  exports: [],
})
export class BaseContrlModule { }