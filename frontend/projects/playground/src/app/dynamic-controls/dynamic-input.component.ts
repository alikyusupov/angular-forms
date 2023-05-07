import { BaseControl } from './base-dynamic-control';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  template: `
  <ng-container [formGroup]="formGroup">
    <label [for]="control.key">{{control.config.label}}</label>
    <input [formControlName]="control.key" [value]="control.config.value">
  </ng-container>
  `,
})
export class DynamicInputComponent extends BaseControl {}
