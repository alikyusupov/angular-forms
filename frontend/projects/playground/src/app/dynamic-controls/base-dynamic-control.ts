import { Directive, HostBinding, Inject, Type } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import { DynamicFormService } from "../dynamic-form/dynamic-form.service";
import { ControlData, CONTROL_DATA } from "../dynamic-form/form-injector.pipe";

@Directive()
export class BaseControl {

    safeNull!:Type<any>

    @HostBinding('class') hostClass = 'form-field'

    constructor(
        @Inject(CONTROL_DATA) public control: ControlData, 
        private readonly parentFormGroup: ControlContainer,
        public dynamicService: DynamicFormService
    ) {}

    get formGroup(){
        return this.parentFormGroup.control as FormGroup
    }

}