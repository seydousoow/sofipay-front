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
import { AuthenticationService } from '../../../services/authentication.service';
import { parsePhoneNumber } from 'libphonenumber-js';
import { take } from 'rxjs';

type TLoginForm = {
  login: FormControl<string>,
  secret: FormControl<string>
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

  public loginType: 'mobile' | 'mail' = 'mobile';

  readonly form: FormGroup<TLoginForm> = new FormGroup(<TLoginForm>{
    login: new FormControl('', {
      nonNullable: true, validators: [Validators.required, isPhoneNumberValid()]
    }),
    secret: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private authService: AuthenticationService) {
  }

  get f(): ɵTypedOrUntyped<TLoginForm, TLoginForm, { [p: string]: AbstractControl }> {
    return this.form.controls;
  }

  doLogin(): void {
    const body = { ...this.form.getRawValue() };
    if (this.loginType === 'mobile') {
      body.login = parsePhoneNumber(body.login, 'SN').formatInternational().replaceAll(/\s/g, '');
    }
    this.authService.login(body, this.loginType).pipe(take(1)).subscribe();
  }

  switchLoginType(type: 'mail' | 'mobile'): void {
    if (this.loginType === type)
      return;
    this.loginType = type;
    this.f.login.setValue('');
    this.f.login.clearValidators();
    if (this.loginType === 'mobile') {
      this.f.login.addValidators([Validators.required, isPhoneNumberValid()]);
    } else if (this.loginType === 'mail') {
      this.f.login.addValidators([Validators.required, Validators.email]);
    }
    this.f.login.markAsUntouched();
  }
}
