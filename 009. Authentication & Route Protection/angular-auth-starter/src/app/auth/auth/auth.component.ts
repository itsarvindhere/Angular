import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: false
})
export class AuthComponent {

  // Currently active mode
  isLoginMode = false;

  // Change Modes between "Log In" and "Sign Up"
  changeMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // Handle Form Submission
  onSubmit(form: NgForm) {
    console.log(form)
  }

}
