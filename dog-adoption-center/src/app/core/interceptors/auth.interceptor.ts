import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';import { AuthService } from '../services/auth.service';
;

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(BYPASS_LOG) === true) {
      return next.handle(request);
    }
    request = request.clone({
      headers: request.headers.set('x-authorization', this.authService.token!)
    });
    return next.handle(request);
  }
}

