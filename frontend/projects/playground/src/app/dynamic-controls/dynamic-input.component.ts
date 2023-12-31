import { BaseControl, viewProvider } from './base-dynamic-control';

import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  viewProviders:[viewProvider],
  template: `
    <label [for]="control.key">{{control.config.label}}</label>
    <input [formControlName]="control.key" [value]="control.config.value">
  `,
})
export class DynamicInputComponent extends BaseControl {}
