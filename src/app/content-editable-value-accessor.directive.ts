import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, Host, HostListener, Renderer2, SecurityContext, forwardRef } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[contenteditable][formControlName]',
  providers:[
    {
      multi: true,
      useExisting: forwardRef(() => ContentEditableValueAccessorDirective),
      provide: NG_VALUE_ACCESSOR
    }
  ]
})
export class ContentEditableValueAccessorDirective implements ControlValueAccessor {

  onChange!: (value) => void
  onTouch!: () => void 

  @HostListener('input', ['$event'])
  onInput(e: Event){
    this.onChange((e.target as HTMLElement).innerHTML)
  }

  @HostListener('blur')
  onBlur(){
    this.onTouch()
  }

  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
    private readonly sanitizer: DomSanitizer
  ) { }
  writeValue(obj: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', this.sanitizer.sanitize(SecurityContext.HTML, obj))
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'contentEditable', !isDisabled)
  }

}
