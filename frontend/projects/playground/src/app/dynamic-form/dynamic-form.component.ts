import { Component, OnInit, Type } from '@angular/core';
import { DynamicControl, DynamicFormConfig } from '../model/dynamic-form.model';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, tap } from 'rxjs';

import { DynamicFormService } from './dynamic-form.service';
import { HttpClient } from '@angular/common/http';
import { comparatorFn } from '../shared/base-control/base-control';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  safeNull!: Type<any>
  form!: FormGroup
  config$!: Observable<DynamicFormConfig>
  loadConfig$ = new Subject<'user' | 'company'>()

  comparatorFn = comparatorFn

  constructor(private readonly http: HttpClient, public dynamicService: DynamicFormService) { }

  ngOnInit(): void {
   this.config$ =  this.loadConfig$.pipe(
      switchMap(config => this.http.get<DynamicFormConfig>(`assets/${config}form.json`)),
      tap(({controls}) => this.buildForm(controls))
    )
  }

  private buildForm(controls: DynamicFormConfig['controls']): void {
    this.form = new FormGroup({})
    Object.keys(controls).forEach(key => {
      this.buildControls(key, controls[key], this.form)
    })
  }

  private buildGroup(controlKey: string, controls: DynamicControl['controls'], parentFormGroup: FormGroup){
    if(!controls) return
    const childGroup = new FormGroup({})
    Object.keys(controls).forEach(key => this.buildControls(key, controls[key], childGroup))
    parentFormGroup.addControl(controlKey, childGroup)
  }

  private buildControls(controlKey: string, config: DynamicControl, formGroup: FormGroup){
    if(config.controlType === 'group'){
      this.buildGroup(controlKey, config.controls, formGroup)
      return
    }
    const vldtrs = this.resolveValidators(config)
    formGroup.addControl(controlKey, new FormControl(config.value, vldtrs))
  }

  onSubmit(){
    console.log(this.form)
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
