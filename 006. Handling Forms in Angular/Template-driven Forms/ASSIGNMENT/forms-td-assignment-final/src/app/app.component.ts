import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('tdForm')
  tdForm: NgForm;

  // Flag to check if form has been submitted
  formSubmitted = false;

  // Object for the form data
  formData = {
    email: '',
    subscription: '',
    password: ''
  }


  // Method that gets called when form is submitted
  handleFormSubmit() {

    // Change the flag
    this.formSubmitted = true;

    // Fill the object with form data
    this.formData.email = this.tdForm.value.email;
    this.formData.subscription = this.tdForm.value.subscription;
    this.formData.password = this.tdForm.value.password;

    // Reset the form
    this.tdForm.reset();
  }

}
