import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { User } from './user.model';

interface AuthResponse {
  idToken: string,
  email: string,
  refreshTokenL: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // User Subject
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  apiKey = "YOUR API TOKEN HERE";

  // Create a new User
  signup(email: string, password: string) : Observable<AuthResponse>
  {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`

    // Make a Post Request
    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true
    })
    .pipe(
      tap(userData => this.createAndStoreUser(userData)),
      catchError(error => throwError(() => this.errorHandler(error)))
    );
  }


  // Log In the User
  login(email: string, password: string) : Observable<AuthResponse>
  {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

    // Make a Post Request
    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(userData => this.createAndStoreUser(userData)),
      catchError(error => throwError(() => this.errorHandler(error)))
    )
  }

  // Error Handler
  private errorHandler(error: HttpErrorResponse) {

    if(!error.error || !error.error.error){
      return "An Error Occured. Please try again!"
    }

    let errorMessage = '';

    switch(error.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = "There is no user corresponding to this email address. Either the user does not exist or may have been deleted!"
        break
      case 'INVALID_PASSWORD':
        errorMessage = "The password is wrong. Please check the password and try again!"
        break
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = "The email or password is wrong. Please check the credentials and try again!"
        break
      case 'USER_DISABLED':
        errorMessage = "This user account has been disabled!"
        break
      case 'EMAIL_EXISTS':
        errorMessage = "The email address is already in use by another account."
        break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later."
        break
      default:
        errorMessage = "An Error Occured. Please try again!";
        break;
    }

    return errorMessage;
  }


  // User Creation Logic
  private createAndStoreUser(userData: AuthResponse) {
    // We get a field "expiresIn" as response with "seconds" after which token expires
    // So, on current date, we can add the "expiresIn" time
    // We are doing "* 1000" becayse "expiresIn" gives us "minutes"
    // Whereas getTime() gives us "milliseconds"
    const tokenExpirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);

    const newUser = new User(userData.email, userData.localId, userData.idToken, tokenExpirationDate)
    this.user.next(newUser);
  }

}
