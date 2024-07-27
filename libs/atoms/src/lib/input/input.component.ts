import { booleanAttribute, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsYouType } from 'libphonenumber-js/min';
import { IconComponent } from '@libs/atoms/src';

@Component({
  selector: 'horizon-input',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  host: {
    '(focusout)': 'onTouched()'
  }
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) label!: string;
  @Input() placeholder = '';
  @Input() inputType: 'email' | 'text' | 'password' | 'number' | 'textarea' | 'phone-number' = 'text';
  @Input() autocomplete = 'off';
  @Input({ transform: booleanAttribute }) invalid: boolean = false;
  @Input({ transform: booleanAttribute }) required: boolean = false;
  @Input({ transform: booleanAttribute }) noLabel: boolean = false;
  @Input({ transform: booleanAttribute }) readonly: boolean = false;

  @Input() value?: string | null | number = '';
  @Input() step = 1;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  @Input() maxLength?: number;

  public showPassword = false;
  public formattedPhoneNumber = '';

  @Output() changed = new EventEmitter<string | number | null>();

  get classes(): string {
    return 'border block w-full bg-gray-50 rounded-lg p-2.5 focus:outline-none ' + (this.invalid
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 text-grey-900 focus:border-primary focus:ring-primary');
  }

  get length(): number {
    return typeof this.value === 'string' ? this.value.length : 0;
  }

  ngOnInit() {
    if (!this.id) this.id = this.name;
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
    if (this.inputType === 'phone-number') {
      const value = String(this.value ?? '');
      if (value.length === 0) this.formattedPhoneNumber = value;
      else this.formattedPhoneNumber = new AsYouType('SN').input(value);
    }
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
