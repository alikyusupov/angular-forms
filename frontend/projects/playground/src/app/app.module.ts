import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFormControlsModule } from 'projects/custom-form-controls/src/public-api';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomFormControlsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
