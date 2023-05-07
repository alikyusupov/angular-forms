import { BaseControl } from './base-dynamic-control';
import { Component, HostBinding, Type } from '@angular/core';

@Component({
  selector: 'app-dynamic-group',
  template: `
    <ng-container [formGroup]="formGroup">
      <fieldset [formGroupName]="control.key">
        <legend>{{ control.config.label }}</legend>
        <ng-container *ngFor="let control of control.config.controls | keyvalue">
          <ng-container 
            [ngComponentOutlet]="(dynamicService.resolve(control.value.controlType) | async ) || safeNull"
            [ngComponentOutletInjector]="control.key | formInjector:control.value"
          ></ng-container>
        </ng-container>
      </fieldset>
    </ng-container>
  `,
  styles: [
  ]
})
export class DynamicGroupComponent extends BaseControl {
  @HostBinding('class') override hostClass = ''
}
