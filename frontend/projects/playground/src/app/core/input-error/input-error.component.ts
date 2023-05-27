import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

import { KeyValue } from '@angular/common';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'input-error',
  template: `
    <div *ngFor="let error of (validationTips | keyvalue) trackBy:trackByFn" class="input-error">
      {{ error.key | errorpipe: error.value }}
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorComponent  {

  validationTips: ValidationErrors | null | undefined

  @Input()
  set errors(err: ValidationErrors | null | undefined) {
    this.validationTips = err
    this.cdr.markForCheck()
  }

  constructor(private readonly cdr: ChangeDetectorRef){}

  trackByFn(index: number, item: KeyValue<string, any>){
    return item.key
  }
}
