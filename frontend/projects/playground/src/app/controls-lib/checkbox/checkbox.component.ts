import { BaseControl } from '../../shared/base-control/base-control';
import { Component } from '@angular/core';

@Component({
  selector: 'checkbox',
  template: `
    <ng-container [formGroup]="formGroup">
    <label [for]="control.key">{{control.config.label}}</label>
      <input type="checkbox" [formControlName]="control.key" [checked]="control.config.value">
    </ng-container>
  `,
  styles:[':host{ margin-top: 145px }']
 
})
export class DynamicCheckboxComponent extends BaseControl{}