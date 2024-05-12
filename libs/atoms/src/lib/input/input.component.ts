import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'horizon-input',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) label!: string;
  @Input() placeholder = '';
  @Input() inputType: 'email' | 'text' | 'password' | 'number' | 'tel' | 'textarea' = 'text';
  @Input() autocomplete = 'off';
  @Input() invalid = false;
  @Input() required = false;
  @Input() noLabel = false;
  @Input() readonly = false;

  @Input() value?: string | null | number = '';
  @Input() step = 1;
  @Input() disabled = false;

  @Input() maxLength?: number;

  @Output() changed = new EventEmitter<string | number | null>();

  get classes(): string {
    return this.invalid
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
      : this.borderColorClasses;
  }

  get length(): number {
    return typeof this.value === 'string' ? this.value.length : 0;
  }

  private get borderColorClasses(): string {
    return 'border-gray-300 focus:border-gray-500 focus:ring-gray-500 focus:outline-none';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onChange: any = () => {
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onTouched: any = () => {
  };

  updateValue($event: KeyboardEvent): void {
    this.value = ($event.target as HTMLInputElement).value;
    if (this.inputType === 'number' && this.value) {
      this.value = Number(this.value);
    }
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  resetValue(): void {
    this.value = '';
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  writeValue(value: string): void {
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
