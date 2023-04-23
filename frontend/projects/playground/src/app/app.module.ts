import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CustomSelectModule } from 'custom-form-controls';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CustomSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
