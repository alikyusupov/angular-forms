import { BaseControl } from '../../shared/base-control/base-control';
import { Component } from '@angular/core';

@Component({
  selector: 'my-input',
  template: `
  <ng-container [formGroup]="formGroup">
    <label [for]="control.key">{{control.config.label}}</label>
    <input [formControlName]="control.key" [value]="control.config.value">
  </ng-container>
  `,
})
export class InputComponent extends BaseControl {}