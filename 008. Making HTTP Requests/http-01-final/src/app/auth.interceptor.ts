import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Inside Auth Interceptor  - Request Sent", request)
    // request.headers.append("auth-header", "123");
    
    const modifiedRequest = request.clone({
      // To the existing headers, just append a new one
      // headers: request.headers.append("auth-header", "123"),
      setHeaders: {
        "auth-header0": "123",
        "auth-header1": "123",
        "auth-header2": "123",
      }
    });

    // You always get an "event" as the response here
    // So that you have a granular access to the response
    return next.handle(modifiedRequest).pipe(tap(event => {
     if(event.type === HttpEventType.Response) {
      console.log("Inside Auth Interceptor - Response Received", event.body)
     }
    }));
  }
}
