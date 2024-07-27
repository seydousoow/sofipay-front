// noinspection JSNonASCIINames,NonAsciiCharacters

import { Component, HostBinding } from '@angular/core';
import { CheckboxComponent, InputComponent, RadioComponent } from '@sofipay/atoms';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵTypedOrUntyped
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isEmailDomainValid, isPhoneNumberValid, mustMatch } from '@sofipay/utils';
import { ISelectOption } from '@sofipay/models';
import { LowerCasePipe } from '@angular/common';
import { ModalComponent } from '@sofipay/components';

type TRegistrationForm = {
  firstname: FormControl<string>,
  lastname: FormControl<string>,
  email: FormControl<string>,
  login: FormControl<string>,
  password: FormControl<string>,
  confirmation: FormControl<string>,
  preferredCanal: FormControl<'SMS' | 'EMAIL'>,
  cgu: FormControl<boolean>
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, RouterLink, RadioComponent, LowerCasePipe, CheckboxComponent, ModalComponent],
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss'
})
export class RegisterComponent {
  @HostBinding('class.bg-radient') radient: boolean = true;

  readonly form: FormGroup<TRegistrationForm> = new FormGroup(<TRegistrationForm>{
    firstname: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    lastname: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, isEmailDomainValid()]
    }),
    login: new FormControl('', {
      nonNullable: true, validators: [Validators.required, isPhoneNumberValid()]
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] }),
    confirmation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    preferredCanal: new FormControl('SMS', { nonNullable: true, validators: [Validators.required] }),
    cgu: new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] })
  }, {
    validators: [mustMatch('password', 'confirmation')]
  });

  readonly communicationsOption: ISelectOption<'SMS' | 'EMAIL'>[] = [
    { value: 'SMS', label: 'Par sms' }, { value: 'EMAIL', label: 'Par email' }
  ];

  constructor() {
  }

  get f(): ɵTypedOrUntyped<TRegistrationForm, TRegistrationForm, { [p: string]: AbstractControl }> {
    return this.form.controls;
  }

}