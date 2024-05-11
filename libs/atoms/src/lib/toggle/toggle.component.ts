import { Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'horizon-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ToggleComponent), multi: true }],
})
export class ToggleComponent implements ControlValueAccessor {
  @HostBinding('attr.role') role = 'switch';
  @HostBinding('attr.type') type = 'button';
  @HostBinding('attr.tabindex') tabIndex = 0;
  @Input() disabled = false;
  @Input({ required: true }) label!: string;
  @Output() toggled = new EventEmitter<boolean>();

  @HostBinding('attr.aria-checked') @HostBinding('class.enabled') value = false;

  @HostListener('click')
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  keyboardEvents(): void {
    this.value = !this.value;
    this.toggled.emit(this.value);
    this.onChange(this.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onTouched: any = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
