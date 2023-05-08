import { Directive, HostBinding, inject, Inject, InjectFlags, StaticProvider, Type } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { DynamicFormService } from "../dynamic-form/dynamic-form.service";
import { ControlData, CONTROL_DATA } from "../dynamic-form/form-injector.pipe";

export const viewProvider: StaticProvider = {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, InjectFlags.SkipSelf)
}

@Directive()
export class BaseControl {

    safeNull!:Type<any>

    @HostBinding('class') hostClass = 'form-field'

    constructor(
        @Inject(CONTROL_DATA) public control: ControlData, 
        public dynamicService: DynamicFormService
    ) {}

    
}