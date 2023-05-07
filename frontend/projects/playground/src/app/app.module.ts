import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomSelectModule } from 'custom-form-controls';
import { DynamicCheckboxComponent } from './dynamic-controls/dynamic-checkbox.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicGroupComponent } from './dynamic-controls/dynamic-group.component';
import { DynamicInputComponent } from './dynamic-controls/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-controls/dynamic-select.component';
import { FormInjectorModule } from './shared/injector-pipe/injector.pipe.module';
import { FormInjectorPipe } from './dynamic-form/form-injector.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormInjectorPipe,
    DynamicCheckboxComponent,
    DynamicFormComponent,
    DynamicGroupComponent,
    DynamicInputComponent,
    DynamicSelectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CustomSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormInjectorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
