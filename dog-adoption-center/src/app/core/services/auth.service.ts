import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register$(userData: {name: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${environment.AUTH_URL}/register`, userData);
  }
}
