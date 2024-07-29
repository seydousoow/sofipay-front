import { Injectable } from '@angular/core';
import { REDIRECT_KEY, TOKEN_KEY } from '../guards/authenticated.guard';
import { IUser, TRole } from '@sofipay/models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

type TJwtDecoder = {
  accountname: string,
  name: string,
  scp: TRole,
  email: string,
  aggregator: string,
  // noinspection SpellCheckingInspection
  authtime: Date
}

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
  }

  private _currentUser?: IUser;

  get currentUser(): IUser | undefined {
    return this._currentUser;
  }

  public isLoggedIn(): boolean {
    return true;
  }

  public login(body: { login: string; secret: string }, AuthMethod: 'mobile' | 'mail'): Observable<void> {
    return this.http.post<void>(`http://51.75.242.129:8949/login`,
      { ...body, secret: window.btoa(body.secret) },
      { observe: 'response', headers: { 'X-Auth-Method': AuthMethod } })
      .pipe(map(response => {
        const token = response.headers.get('Authorization');
        if (token == null) throw of('NO_TOKEN');
        localStorage.setItem(TOKEN_KEY, token);
        this.setCurrentUser();
        this.redirect();
      }));
  }

  public logout(): void {
    sessionStorage.removeItem(REDIRECT_KEY);
    localStorage.removeItem(TOKEN_KEY);
    this._currentUser = undefined;
    this.router.navigate(['/', 'login']).finally();
  }

  private setCurrentUser(): void {
    const parse = this.jwtHelper.decodeToken() as TJwtDecoder;
    this._currentUser = {
      active: true,
      id: parse.accountname,
      fullName: parse.name,
      role: parse.scp,
      email: parse.email
    };
  }

  private redirect() {
    const redirectKey = sessionStorage.getItem(REDIRECT_KEY);
    if (redirectKey && ['admin', 'client', 'trz'].some(s => redirectKey.startsWith(s, redirectKey.startsWith('/') ? 1 : 0))) {
      void this.router.navigate([redirectKey]);
    }
    let redirect: string;
    if (this._currentUser?.role === 'MASTER') {
      redirect = 'admin';
    } else if (this._currentUser?.role === 'CLIENT') {
      redirect = 'client';
    } else {
      redirect = 'trz';
    }
    void this.router.navigate([redirect]);
  }
}