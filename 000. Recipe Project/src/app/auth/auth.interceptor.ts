import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.startsWith('https://identitytoolkit.googleapis.com')) {
      return next.handle(request);
    }

    return this.authService.user.pipe(
      switchMap(userData => {

        // Modify the Outgoing Request
        const modifiedRequest = request.clone({
          params: request.params.append("auth", userData?.token ?? '')
        })

        // Forward the modifiedRequest
        return next.handle(modifiedRequest)
      })
    );

  }
}
