import { BaseControl, viewProvider } from './base-dynamic-control';

import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-checkbox',
  viewProviders:[viewProvider],
  template: `
    <label [for]="control.key">{{control.config.label}}</label>
      <input type="checkbox" [formControlName]="control.key" [checked]="control.config.value">
  `,
  styles:[':host{ margin-top: 145px }']
 
})
export class DynamicCheckboxComponent extends BaseControl{}
