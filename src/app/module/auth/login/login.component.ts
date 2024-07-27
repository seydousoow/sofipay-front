// noinspection JSNonASCIINames,NonAsciiCharacters

import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, InputComponent } from '@sofipay/atoms';
import { RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵTypedOrUntyped
} from '@angular/forms';
import { isPhoneNumberValid } from '@sofipay/utils';

type TLoginForm = {
  login: FormControl<string>,
  password: FormControl<string>
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputComponent, RouterModule, ReactiveFormsModule, IconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @HostBinding('class.bg-radient') radient: boolean = true;

  public loginType: 'phone' | 'mail' = 'phone';

  readonly form: FormGroup<TLoginForm> = new FormGroup(<TLoginForm>{
    login: new FormControl('', {
      nonNullable: true, validators: [Validators.required, isPhoneNumberValid()]
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  get f(): ɵTypedOrUntyped<TLoginForm, TLoginForm, { [p: string]: AbstractControl }> {
    return this.form.controls;
  }

  doLogin(): void {

  }

  switchLoginType(type: 'mail' | 'phone'): void {
    if (this.loginType === type)
      return;
    this.loginType = type;
    this.f.login.setValue('');
    if (this.loginType === 'phone') {
      this.f.login.removeValidators(Validators.email);
      this.f.login.addValidators(isPhoneNumberValid());
    } else if (this.loginType === 'mail') {
      this.f.login.removeValidators(isPhoneNumberValid());
      this.f.login.addValidators(Validators.email);
    }
    this.f.login.markAsUntouched();
  }
}
