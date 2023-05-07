import { InjectionToken, Injector, Pipe, PipeTransform } from '@angular/core';

import { DynamicControl } from '../../model/dynamic-form.model';

export type ControlData = {
  key: string,
  config: DynamicControl
}

export const CONTROL_DATA = new InjectionToken<ControlData>('token for dynamic control')

@Pipe({
  name: 'formInjector'
})
export class FormInjectorPipe implements PipeTransform {

  constructor(private readonly injector: Injector){}

  transform(key: string, config: DynamicControl): Injector {    
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: CONTROL_DATA,
          useValue: { key, config }
        }
      ]
    });
  }
}
