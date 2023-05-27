import { Directive, HostBinding, inject, Inject, InjectFlags, OnInit, StaticProvider, Type } from "@angular/core";
import { AbstractControl, ControlContainer, FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicFormService } from "../dynamic-form/dynamic-form.service";
import { ControlData, CONTROL_DATA } from "../dynamic-form/form-injector.pipe";
import { DynamicControl } from "../model/dynamic-form.model";

export const viewProvider: StaticProvider = {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, InjectFlags.SkipSelf)
}

@Directive()
export class BaseControl implements OnInit {

    safeNull!:Type<any>
    formControl: AbstractControl = new FormControl(
        this.control.config.value,
        this.resolveValidators(this.control.config)
    )

    @HostBinding('class') hostClass = 'form-field'

    constructor(
        @Inject(CONTROL_DATA) public control: ControlData, 
        public dynamicService: DynamicFormService,
        private readonly parentGroupDir: ControlContainer
    ) {}

    ngOnInit(): void {
        (this.parentGroupDir.control as FormGroup)
            .addControl(this.control.key, this.formControl)
    }


    resolveValidators({validators = {}}: DynamicControl): Validators{
        return (Object.keys(validators) as Array<keyof typeof validators>).map(validationKey => {
          const validationValue = validators[validationKey]
          if(validationKey === "required"){
            return Validators.required
          }
          if(validationKey === "email"){
            return Validators.email;
          }
          if(validationKey === "requiredTrue"){
            return Validators.requiredTrue
          }
          if(validationKey === "minLength" && typeof validationValue === 'number'){
            return Validators.minLength(validationValue);
          }
          return Validators.nullValidator
        })
    }
}