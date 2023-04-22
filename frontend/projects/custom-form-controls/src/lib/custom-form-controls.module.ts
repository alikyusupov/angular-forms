import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RatingPickerComponent } from './rating-picker/rating-picker.component';

@NgModule({
  declarations: [
    RatingPickerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RatingPickerComponent,
  ]
})
export class CustomFormControlsModule { }
