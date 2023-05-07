import { CommonModule } from '@angular/common';
import { FormInjectorPipe } from './injector.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FormInjectorPipe],
  imports: [
    CommonModule
  ],
  exports: [FormInjectorPipe],
})
export class FormInjectorModule { }
