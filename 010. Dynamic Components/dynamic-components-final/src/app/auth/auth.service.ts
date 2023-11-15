import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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

  // Token Expiration Timeout
  tokenExpirationTimeout : any;

  // User Subject
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  apiKey = "AIzaSyB16riUrCX_xld6pHaAHiuggpjD4Dx81cY";

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

  // Auto Login if data is present in localStorage
  autoLogin() {
    // If we don't have userData
    if (!localStorage.getItem('userData')) return;

    // Otherwise
    // Get the original javascript Object
    const userData : {email: string, 
      id: string, 
      _token: string, 
      _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData')!)

    const loggedInUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    // Check if the loaded user has a valid token
    if (loggedInUser.token) {

      // Emit the loggedInUser using the BehaviorSubject
      this.user.next(loggedInUser); 

      // Current Time in milliseconds
      const currentTime = new Date().getTime();

      // Time at which Token Expires in milliseconds
      const tokenExpirationTime = new Date(userData._tokenExpirationDate).getTime();

      // Time in Milliseconds after which token expires
      const timeLeftForTokenExpiry = tokenExpirationTime - currentTime

      // Start the timer for auto logout
      this.autoLogout(timeLeftForTokenExpiry);

    } else{
      
      // If the saved "userData" does not have a valid token
      this.logout();
    }

  }

  // Auto Logout if the token expires
  // Takes the amount of milliseconds as input
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Log the user out
  logout(){

    this.user.next(null);

    // Redirect to the /auth page
    this.router.navigate(['/auth']);

    // Remove the localStorage data about the user
    localStorage.removeItem('userData');
    
    // Clear the timer
    clearTimeout(this.tokenExpirationTimeout);
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
    
    // Emit the newUser using the BehaviorSubject
    this.user.next(newUser);

    // Start the expiration timer
    this.autoLogout(+userData.expiresIn * 1000)

    // Save the userData in localStorage
    localStorage.setItem("userData", JSON.stringify(newUser))
  }

}
