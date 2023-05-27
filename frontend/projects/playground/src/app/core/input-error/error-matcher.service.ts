import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

import { Injectable } from '@angular/core';

interface ErrorMatcher {
  isErrorVisible: (control: AbstractControl | null, form: NgForm | FormGroupDirective| null) => boolean
}

@Injectable({
  providedIn: 'root'
})
export class ErrorMatcherService implements ErrorMatcher {

  constructor() { }

  isErrorVisible(control: AbstractControl | null, form: NgForm | FormGroupDirective| null) {
    return Boolean(control && control.invalid && (control.dirty || (form && form.submitted)))
  }
}

@Injectable({
  providedIn: 'root'
})
export class OnTouchErrorMatcherService implements ErrorMatcher {

  constructor() { }

  isErrorVisible(control: AbstractControl | null, form: NgForm | FormGroupDirective| null) {
    return Boolean(control && control.invalid && (control.touched || (form && form.submitted)))
  }
}
