import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/internal/operators/tap';

const headers= new HttpHeaders()
  .set('x-authorization', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private _currentUser = new BehaviorSubject<User>(undefined!);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  currentUser!: User;

  register$(userData: {name: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${environment.AUTH_URL}/users/register`, userData)
      .pipe(
        tap(user => this.currentUser = user)
      );
  }

  login$(userData: {email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${environment.AUTH_URL}/users/login`, userData)
      .pipe(
        tap(user => this.currentUser = user)
      );
  }

  logout$(): Observable<any> {
    return this.http.get<any>(`${environment.AUTH_URL}/users/logout`);
  }

  handleLogin(newUser: User) {
    this._currentUser.next(newUser);
  }

  handleLogout() {
    this._currentUser.next(undefined!);
  }
}
