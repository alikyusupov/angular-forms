import { BaseControl } from './base-dynamic-control';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-select',
  template: `
  <ng-container [formGroup]="formGroup">
  <label [for]="control.key">{{control.config.label}}</label>
    <select [formControlName]="control.key" [id]="control.key" [value]="control.config.value">
      <option
        *ngFor="let option of control.config.options"
        [value]="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </ng-container>
  `,
})
export class DynamicSelectComponent extends BaseControl {}
