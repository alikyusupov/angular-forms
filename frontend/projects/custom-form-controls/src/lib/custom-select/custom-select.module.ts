import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select.component';
import { NgModule } from '@angular/core';
import { OptionComponent } from './option/option.component'
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    CustomSelectComponent,
    OptionComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    CustomSelectComponent,
    OptionComponent
  ]
})
export class CustomSelectModule { }
