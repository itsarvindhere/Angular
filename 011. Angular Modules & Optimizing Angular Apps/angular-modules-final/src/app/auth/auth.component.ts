import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  @ViewChild('alertModal', {read: ViewContainerRef})
  public alertComponentContainer !: ViewContainerRef;
  

  // Currently active mode
  isLoginMode = true;

  // To show or hide the loading spinner
  requestInProgress = false;

  // Error Message
  error = '';

  // Subscription
  authSub !: Subscription;
  closeSub !: Subscription;

  constructor(private authService : AuthService, private router: Router){}

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

      this.requestInProgress = true;

      // Make the request depending on whether it is login or signup request
      const request = this.isLoginMode ? this.authService.login(email, password) : this.authService.signup(email,password);

      this.authSub = request.subscribe({
          next: data => {
            this.requestInProgress = false;
            // Navigate the User to the '/recipes' page
            this.router.navigate(['/recipes']);

          },
          error: error => {
            this.requestInProgress = false;
            this.error = error;
            this.showErrorAlert(error);
          }
      })
    }
    
  }

  // Show the Error Alert Modal
  private showErrorAlert(errorMessage : string) {
    // Programmatically create the Alert Component

    // const alertComponentFactory = this.cfr.resolveComponentFactory(AlertComponent)

    // Clear Anything that might've been rendered in the ng template
    this.alertComponentContainer.clear();

    // Render the "Alert Component" in the ng template
    const alertCmpRef = this.alertComponentContainer.createComponent(AlertComponent);

    // Pass the errorMessage to the Alert Component
    alertCmpRef.instance.message = errorMessage;

    // Listen to the "close" event emitted by Alert Component
    this.closeSub = alertCmpRef.instance.close.subscribe({
      next: (data : any )=> {
        this.closeSub.unsubscribe();
        this.alertComponentContainer.clear()
      }
    });
  }

  ngOnDestroy(): void {
      this.authSub?.unsubscribe();
      this.closeSub?.unsubscribe();
  }

}
