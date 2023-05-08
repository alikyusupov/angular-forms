import { KeyValue } from "@angular/common";
import { Directive, HostBinding, Inject, Type } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import { DynamicFormService } from "../../dynamic-form/dynamic-form.service";
import { DynamicControl } from "../../model/dynamic-form.model";
import { ControlData, CONTROL_DATA } from "../injector-pipe/injector.pipe";


export const comparatorFn = (a: KeyValue<string, DynamicControl>, b: KeyValue<string, DynamicControl>) => a.value.order - b.value.order

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