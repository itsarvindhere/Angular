import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

interface AuthResponse {
  idToken: string,
  email: string,
  refreshTokenL: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiKey = "Your API KEY HERE";

  // Create a new User
  signup(email: string, password: string) : Observable<AuthResponse>
  {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`

    // Make a Post Request
    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(error => {

      let errorMessage = "An Error Occured. Please try again!"

      if(!error.error || !error.error.error){
        return throwError(() => errorMessage)
      }

      switch(error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "The email address is already in use by another account."
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later."
          break
        default:
          errorMessage = "Sign up failed"
          break;
      }

      return throwError(() => errorMessage)

    })
    );
  }


}
