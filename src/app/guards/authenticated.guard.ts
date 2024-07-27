import { inject, Injectable } from '@angular/core';
import { Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard {
  constructor(private authService: AuthenticationService, private router: Router) {}

  isAuthenticated(segments: UrlSegment[]): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      sessionStorage.setItem(REDIRECT_KEY, segments.join('/'));
      this.router.navigate(['/', 'login']).finally();
      return false;
    }
    return true;
  }
}
export const isAuthenticated = (urlSegments: UrlSegment[], authService = inject(AuthenticatedGuard)) => authService.isAuthenticated(urlSegments);
export const REDIRECT_KEY: string = 'redirect-key';
export const CURRENT_USER_KEY: string = 'current_user';
export const TOKEN_KEY: string = 'access_token';
