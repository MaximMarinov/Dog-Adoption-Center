import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/internal/operators/tap';
import { BYPASS_LOG } from '../interceptors/auth.interceptor';

// const headers = new HttpHeaders()
//   .set('x-authorization', )
//   .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient) { 
    this._isLoggedIn.next(!!this.token);
  }

  private _currentUser = new BehaviorSubject<User>(undefined!);
  currentUser$ = this._currentUser.asObservable();

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'accessToken'
  isLoggedIn$ = this._isLoggedIn.asObservable();

  currentUser!: User;

  register$(userData: {name: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${environment.AUTH_URL}/users/register`, userData, {context: new HttpContext().set(BYPASS_LOG, true)})
    .pipe(
      tap((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.accessToken)
      })
    );
  }

  login$(userData: {email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${environment.AUTH_URL}/users/login`, userData, {context: new HttpContext().set(BYPASS_LOG, true)})
      .pipe(
        tap((response: any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem(this.TOKEN_NAME, response.accessToken)
        })
      );
  }

  logout$(): Observable<any> {
    return this.http.get<any>(`${environment.AUTH_URL}/users/logout`).pipe(
      tap((response: any) => {
        this._isLoggedIn.next(false);
        localStorage.removeItem(this.TOKEN_NAME);
      }));
  }

  handleLogin(bool: boolean) {
    this._isLoggedIn.next(bool);
  }

  handleLogout() {
    this._isLoggedIn.next(false);
  }
}
