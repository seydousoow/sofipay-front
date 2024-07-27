import { AfterViewInit, Component, EventEmitter, forwardRef, Input, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { ISelectOption } from '@sofipay/models';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { InputComponent } from '../input/input.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'horizon-select',
  standalone: true,
  imports: [OverlayModule, CommonModule, IconComponent, InputComponent, FormsModule, SearchComponent],
  templateUrl: './select.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }],
})
export class SelectComponent<T = string> implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) items: ISelectOption<T>[] = [];
  @Input() placeholder = 'common.select';
  @Input({ required: true }) label!: string;
  @Input() multiple = false;
  @Input({ required: true }) id!: string;
  @Input() searchable = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() noLabel = false;
  @Input() size: 'small' | 'medium' | 'large' = 'large';

  @Output() changed = new EventEmitter<ISelectOption<T>[]>();
  @Output() searched = new EventEmitter<string>();
  @ViewChild('trigger') trigger!: CdkOverlayOrigin;

  isOpen = false;
  width!: string;

  selectedItems: ISelectOption<T>[] = [];

  @Input() selectedValues?: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

  @Input() showValue = false;

  highlightedElement?: number;
  private observer!: ResizeObserver;

  constructor(private zone: NgZone) {}

  get selectedItemsLabel(): string {
    return this.selectedItems.map((item) => this.showValue ? item.value : item.label).join(', ');
  }

  get classes(): string {
    return this.invalid
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
      : this.borderColorClasses;
  }

  private get borderColorClasses(): string {
    return 'border-gray-300 focus:border-gray-500 focus:ring-gray-500 focus:outline-none';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onTouched: any = () => {};

  ngOnInit(): void {
    this.observer = new ResizeObserver(() => {
      this.zone.run(() => {
        this.isOpen = false;
      });
    });

    this.selectedItems = this.items.filter(item => this.selectedValues?.includes(item.value));
  }

  ngAfterViewInit() {
    this.observer?.observe(this.trigger.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.unobserve(this.trigger.elementRef.nativeElement);
  }

  toggle(): void {
    this.width = this.trigger.elementRef.nativeElement.getBoundingClientRect().width;
    this.isOpen = !this.isOpen;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(values: T[]): void {
    for (const value of values) {
      const updatedItem = this.items.find((item) => item.value === value);
      if (!updatedItem) {
        return;
      }
      this.updateSelection(updatedItem);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  toggleValue(item: ISelectOption<T>) {
    this.updateSelection(item);
    this.changed.emit(this.selectedItems);
    this.onChange([item.value]);
  }

  handleKeyboardNavigation($event: KeyboardEvent) {
    switch ($event.code) {
      case 'Tab':
        this.isOpen = false;
        break;
      case 'Space':
        if (this.highlightedElement !== undefined) {
          $event.preventDefault();
          this.toggleValue(this.items[this.highlightedElement]);
        }
        break;
      case 'ArrowDown':
        if (!this.isOpen) {
          this.toggle();
        }
        $event.preventDefault();
        this.highlightDown();
        break;
      case 'ArrowUp':
        if (!this.isOpen) {
          this.toggle();
        }
        $event.preventDefault();
        this.highlightUp();
        break;
    }
  }

  private updateSelection(item: ISelectOption<T>) {
    if (this.multiple) {
      if (this.selectedItems.includes(item)) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      } else {
        this.selectedItems.push(item);
      }
    } else {
      this.selectedItems = [item];
      this.isOpen = false;
    }
  }

  private highlightUp(): void {
    if (this.highlightedElement === undefined) {
      this.highlightedElement = 0;
    } else if (this.highlightedElement > 0) {
      this.highlightedElement--;
    }
  }

  private highlightDown(): void {
    if (this.highlightedElement === undefined) {
      this.highlightedElement = 0;
    } else if (this.highlightedElement < this.items.length - 1) {
      this.highlightedElement++;
    }
  }
}
