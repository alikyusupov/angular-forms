import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RateOptions } from 'projects/playground/src/app/app.component';

@Component({
  selector: 'rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingPickerComponent),
      multi: true
    }
  ]
})
export class RatingPickerComponent implements OnInit, ControlValueAccessor {

  @Input() value: RateOptions = null
  @Output() valueChangeEvent = new EventEmitter<RateOptions>()

  @Input()
  @HostBinding()
  tabIndex = 0

  @HostListener('blur')
  onBlur(){
    this.onTouch()
  }
  @Input() disabled = false

  onChange: (value: any) => void = () => {}
  onTouch: () => void = () => {}

  constructor() { }

  writeValue(obj: any): void {
    this.value = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  ngOnInit(): void {
  }

  setValue(option: RateOptions){
    if(!this.disabled){
      this.value = option
      this.onChange(option)
      this.onTouch()
      this.valueChangeEvent.emit(option)
    }
  }
}
