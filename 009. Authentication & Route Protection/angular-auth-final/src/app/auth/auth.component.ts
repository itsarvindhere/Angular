import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  // Currently active mode
  isLoginMode = false;

  // To show or hide the loading spinner
  requestInProgress = false;

  // Error Message
  error = '';

  constructor(private authService : AuthService){}

  // Change Modes between "Log In" and "Sign Up"
  changeMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // Handle Form Submission
  onSubmit(form: NgForm) {

    // If the form is invalid
    if (form.invalid) return

    const email = form.value.email;
    const password = form.value.password;

    // Make the HTTP Request if we have a valid data
    if (email && password) {

      // For Login Mode
      if (this.isLoginMode) {

      } 

      // For Signup Mode
      else {
        this.requestInProgress = true;
        this.authService.signup(email,password).subscribe({
          next: data => {
            this.requestInProgress = false;
            console.log("User Created. Data is", data)
          },
          error: error => {
            this.requestInProgress = false;
            this.error = error;
            setTimeout(() => 
            this.error = '', 2000)
          }
        })
      }
    }

    form.reset();
    
  }

}
