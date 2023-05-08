import { BaseControl } from '../../shared/base-control/base-control';
import { Component } from '@angular/core';

@Component({
  selector: 'my-select',
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
export class SelectComponent extends BaseControl {}