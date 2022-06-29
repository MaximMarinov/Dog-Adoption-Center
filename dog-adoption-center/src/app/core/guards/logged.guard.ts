import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(): Observable<| boolean | UrlTree> {

    return this.authService.isLoggedIn$.pipe(take(1), map(isLoggedIn => {
      if (!isLoggedIn) {
        return true
      }
      return this.router.createUrlTree(['/']);
    }));
  }
}
