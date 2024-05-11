import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'horizon-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) label!: string;
  @Input() noLabel = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() disabled = false;

  @Input() checked = false;

  @Input() indeterminate = false;

  @Input() labelAfterCheck = false;

  @Output() toggled = new EventEmitter<boolean>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onTouched: any = () => {};

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(checked: boolean): void {
    this.checked = checked;
  }

  updateValue($event: Event): void {
    this.checked = ($event.target as HTMLInputElement).checked;
    this.onChange(this.checked);
    this.toggled.emit(this.checked);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
