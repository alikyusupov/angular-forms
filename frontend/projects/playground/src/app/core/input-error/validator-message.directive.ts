import { ComponentRef, Directive, ElementRef, Inject, OnDestroy, OnInit, Optional, Self, ViewContainerRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { filter, fromEvent, merge, skip, startWith, Subscription, tap } from 'rxjs';
import { ErrorMatcherService, OnTouchErrorMatcherService } from './error-matcher.service';
import { InputErrorComponent } from './input-error.component';

@Directive({
  selector: '[ngModel],[formControl],[formControlName]',
  providers: [{
    provide: ErrorMatcherService,
    useClass: OnTouchErrorMatcherService
  }]
})
export class ValidatorMessageDirective implements OnInit, OnDestroy{

  componentRef: ComponentRef<InputErrorComponent> | null = null
  errorSub!: Subscription

  constructor( 
    @Self() @Inject(NgControl) private readonly ngControl: NgControl,
    private readonly vcr: ViewContainerRef,
    private readonly elementRef: ElementRef,
    private readonly errorMatcherService: ErrorMatcherService,
    @Optional() private readonly parentContainer: ControlContainer
  ) { }

  get form(){
    return this.parentContainer.formDirective as NgForm | FormGroupDirective | null
  }

  ngOnInit(): void {
    if(this.ngControl.control){
      this.errorSub = merge(fromEvent(this.elementRef.nativeElement, 'blur'), this.ngControl.control?.statusChanges)
      .pipe(
        startWith(this.ngControl.status),
        skip(this.ngControl instanceof NgModel ? 1 : 0 ),
        filter(status => status === 'VALID' || status === "INVALID"),
        tap(() => console.log(this.ngControl.control))
        // distinctUntilChanged()
      ).subscribe(() => {      
        if(this.errorMatcherService.isErrorVisible(this.ngControl.control, this.form)){
          if(!this.componentRef){
            this.componentRef = this.vcr.createComponent(InputErrorComponent)
            this.componentRef.changeDetectorRef.markForCheck()
          }
          this.componentRef.instance.errors = this.ngControl.errors
        } else {
          this.componentRef?.destroy()
          this.componentRef = null
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }
}
