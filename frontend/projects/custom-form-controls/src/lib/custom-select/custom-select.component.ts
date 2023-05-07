import { AfterViewInit, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { AnimationEvent, animate, state, style, transition, trigger } from '@angular/animations';
import { Subject, merge, startWith, switchMap, takeUntil, tap } from 'rxjs';

import { OptionComponent } from './option/option.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ActiveDescendantKeyManager, ListKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

class ComparableSelectionModel<T> extends SelectionModel<T> {
  compareWith: (o1: T, o2: T) => boolean;

  constructor(
    _multiple?: boolean, 
    initial?: T[], 
    _emitChanges?: boolean, 
    compareWith?: (o1: T, o2: T) => boolean) {
    super(_multiple, initial, _emitChanges);

    this.compareWith = compareWith ? compareWith : (o1, o2) => o1 === o2;
  }

  override isSelected(value: T): boolean {
    return this.selected.some((x) => this.compareWith(value, x))
  }

  /**
   * We also need to override deselect since you may have objects that 
   * meet the comparison criteria but are not the same instance.
   */
  override deselect(...values: T[]): void {
    // using bracket notation here to work around private methods
    this['_verifyValueAssignment'](values);

    values.forEach((value) => {
      // need to find the exact object in the selection set so it 
      // actually gets deleted
      const found = this.selected.find((x) => this.compareWith(value, x));
      if (found) {
        this['_unmarkSelected'](found);
      }
    });

    this['_emitChangeEvent']();
  }
}

export type SelectType<T> = T | T[] | null

@Component({
  selector: 'lib-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  animations: [
    trigger('dropDown', [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
      transition(':leave', [animate('420ms cubic-bezier(0.88,-0.7, 0.86, 0.85)')]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelectComponent),
    multi: true
  }]
})
export class CustomSelectComponent<T> implements OnInit, OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {

  protected onChange: (value: SelectType<T>) => void = () => {}
  protected onTouch: () => void = () => {}

  @Input()
  label = ''

  @Input()
  searchable = false

  @Input()
  displayWith: ((value: T) => string | number) | null = null

  @Input()
  compareWith: ((v1: T | null, v2: T | null) => boolean) = (v1, v2) => v1 === v2

  @Input()
  set value (value: SelectType<T>){
    this.setupValue(value)
    this.onChange(value)
    this.highlightSelectedOption(value)
  }
  get value() {
    if(this.selectionModel.isEmpty()) return null
    if(this.selectionModel.isMultipleSelection()) return this.selectionModel.selected
    return this.selectionModel.selected[0] || null
  }

  @Input()
  @HostBinding('class.disabled')
  disabled = false

  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();

  @Output()
  readonly searchChanged = new EventEmitter<string>()

  @Output()
  readonly selectionChanged = new EventEmitter<SelectType<T>>()

  @HostListener('click')
  toggle(){
    if(this.disabled) return
    this.isOpen = !this.isOpen
    if(this.isOpen && this.searchable){
      setTimeout(() => this.searchInput.nativeElement.focus(),0)
    }
    this.cd.markForCheck();
  }

  @ContentChildren(OptionComponent, { descendants: true })
  options!: QueryList<OptionComponent<T>>

  @ViewChild('input') searchInput!: ElementRef<HTMLInputElement>

  private unsubscribe$ = new Subject<void>()
  private selectionModel = new ComparableSelectionModel<T>(coerceBooleanProperty(this.multiple))
  private listKeyManager!: ActiveDescendantKeyManager<OptionComponent<T>>

  @HostBinding('class.select-panel-open')
  isOpen = false

  @HostBinding('attr.tabIndex')
  @Input()
  tabIndex = 0

  @HostListener('blur')
  markAsTouched(){
    if(!this.disabled && !this.isOpen){
      this.onTouch()
      this.cd.markForCheck()
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if(e.key === 'ArrowDown' && !this.isOpen){
      this.toggle()
      return 
    }
    if((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.isOpen){
      this.listKeyManager.onKeydown(e)
      return
    }
    if(e.key === 'Enter' && this.isOpen && this.listKeyManager.activeItem){
      this.handleSelection(this.listKeyManager.activeItem)
      return
    }
  }

  constructor(
    @Attribute('multiple') private multiple: string | null, 
    private readonly cd: ChangeDetectorRef,
    private readonly elRef: ElementRef
    ) { }
  writeValue(value: any): void {
    this.setupValue(value)
    this.highlightSelectedOption(value)
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
    this.cd.markForCheck();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['compareWith']){
      this.selectionModel.compareWith = changes['compareWith'].currentValue
      this.highlightSelectedOption(this.value)
    }
  }

  ngAfterViewInit(): void {
    this.listKeyManager = new ActiveDescendantKeyManager(this.options).withWrap()
    this.listKeyManager.change.pipe(takeUntil(this.unsubscribe$)).subscribe(index => {
      this.options.get(index)?.scrollIntoView()
    })
    this.listKeyManager.setFirstItemActive()
    this.options.changes
    .pipe(
      takeUntil(this.unsubscribe$),
      startWith<QueryList<OptionComponent<T>>>(this.options),
      tap(() => queueMicrotask(() => this.highlightSelectedOption(this.value))),
      switchMap(options => merge(...options.map((o: OptionComponent<T>) => o.selected)))
    ).subscribe(selectedOption => {
      this.handleSelection(selectedOption)
    })
    this.selectionModel.changed
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(values => {
      values.removed.forEach(rv => this.findOptionByValue(rv)?.deselect())
      values.added.forEach(av => this.findOptionByValue(av)?.highlightAsSelected())
    })
  }

  onAnimationDone({ fromState, toState }: AnimationEvent){
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  close(): void {
    this.isOpen = false
    this.onTouch()
    this.elRef.nativeElement.focus()
    this.cd.markForCheck();
  }

  private highlightSelectedOption(value: SelectType<T>){
    return Array.isArray(value) 
    ? value.map( v =>  this.findOptionByValue(v)?.highlightAsSelected())
    : this.findOptionByValue(value)?.highlightAsSelected()
  }

  private findOptionByValue(value: T | null){
    return this.options && this.options.find(o => this.compareWith(o.value, value))
  }

  private handleSelection(option: OptionComponent<T>) {
    if(this.disabled) return
    if(option.value) {
      this.selectionModel.toggle(option.value)
      this.selectionChanged.emit(this.value)
      this.onChange(this.value)
    }
    if(!this.selectionModel.isMultipleSelection()){
      this.close()
    }
  }

  private setupValue(value: SelectType<T>): void {
    this.selectionModel.clear()
    if(value){
      Array.isArray(value)
      ? this.selectionModel.select(...value)
      : this.selectionModel.select(value)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  get displayValue() {
    if (this.displayWith && this.value) {
      if (Array.isArray(this.value)) {
        return this.value.map(this.displayWith).join(', ');
      }
      return this.displayWith(this.value);
    }
    return this.value;
  }

  onClear(e?: Event): void {
    e?.stopPropagation()
    if(this.disabled) return
    this.selectionModel.clear()
    this.selectionChanged.emit(this.value)
    this.onChange(this.value)
    this.cd.markForCheck();
  }

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value
    this.searchChanged.emit(value)
  }
}
