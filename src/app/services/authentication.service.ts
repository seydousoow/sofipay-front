import { Injectable } from '@angular/core';
import { CURRENT_USER_KEY, REDIRECT_KEY, TOKEN_KEY } from '../guards/authenticated.guard';
import { IUser } from '@sofitay/models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  private _currentUser?: IUser;

  constructor(private http: HttpClient, private router: Router) {
    this._currentUser = { active: true, email: 'seydousoow@gmail.com', firstName: 'Seydou', id: 0, lastName: 'Sow', telephone: '', role: 'ADMIN'};
  }

  get currentUser(): IUser | undefined {
    return this._currentUser;
  }

  public isLoggedIn(): boolean {
    return true;
  }

  public login(body: any): Observable<void> {
    return this.http.post<void>(``, { ...body, password: btoa(body.password) }, { observe: 'response' })
      .pipe(map(_ => {
        // store token
        // sessionStorage.removeItem(REDIRECT_KEY);
        // sessionStorage.removeItem(CURRENT_USER_KEY);
        // sessionStorage.removeItem(TOKEN_KEY);
      }));
  }

  public logout(): void {
    sessionStorage.removeItem(REDIRECT_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    this._currentUser = undefined;
    this.router.navigate(['/', 'login']).finally();
  }

}