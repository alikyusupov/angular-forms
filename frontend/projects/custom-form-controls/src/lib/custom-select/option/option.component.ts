import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'lib-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> implements OnInit, Highlightable {

  @Input()
  @HostBinding('class.disabled')
  disabled = false

  @Input()
  disabledReason = ''

  @Input()
  value: T | null = null

  @Output()
  selected = new EventEmitter<OptionComponent<T>>()

  @HostListener('click')
  protected select(): void {
    if(this.disabled) return
    this.highlightAsSelected()
    this.selected.emit(this)
  }

  @HostBinding('class.selected')
  protected isSelected = false

  @HostBinding('class.active')
  protected isActive = false

  constructor(private readonly cd: ChangeDetectorRef, private readonly elRef: ElementRef) { }
  setActiveStyles(): void {
    this.isActive = true
    this.cd.markForCheck()
  }
  setInactiveStyles(): void {
    this.isActive = false
    this.cd.markForCheck()
  }
 
  ngOnInit(): void {
  }


  highlightAsSelected() {    
    this.isSelected = true
    this.cd.markForCheck()
  }

  deselect(): void {
    this.isSelected = false
  }

  scrollIntoView(): void {
    this.elRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

}
