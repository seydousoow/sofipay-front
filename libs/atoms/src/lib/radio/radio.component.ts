import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'horizon-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioComponent), multi: true }],
})
export class RadioComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) label!: string;
  @Input() noLabel = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() disabled = false;

  @Input() checked = false;

  @Input() labelAfterCheck = false;

  @Output() selected = new EventEmitter<boolean>();

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

  updateValue(): void {
    this.checked = true;
    this.onChange(this.checked);
    this.selected.emit(this.checked);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
