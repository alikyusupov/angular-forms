import { BaseControl, viewProvider } from './base-dynamic-control';
import { Component, HostBinding } from '@angular/core';
import { comparatorFn } from '../shared/base-control/base-control';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-group',
  viewProviders:[viewProvider],
  template: `
      <fieldset [formGroupName]="control.key">
        <legend>{{ control.config.label }}</legend>
        <ng-container *ngFor="let control of control.config.controls | keyvalue: comparatorFn">
          <ng-container 
            [ngComponentOutlet]="(dynamicService.resolve(control.value.controlType) | async ) || safeNull"
            [ngComponentOutletInjector]="control.key | formInjector:control.value"
          ></ng-container>
        </ng-container>
      </fieldset>
  `,
  styles: [
  ]
})
export class DynamicGroupComponent extends BaseControl {
  @HostBinding('class') override hostClass = ''
  comparatorFn = comparatorFn
  override formControl: AbstractControl = new FormGroup({})
}
