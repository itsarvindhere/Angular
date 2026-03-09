import { Component, signal } from '@angular/core';
import { FormData } from '../model/form';
import { form, FormField } from '@angular/forms/signals'

@Component({
  selector: 'app-root',
  imports: [FormField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Define the form model as a signal
  formModel = signal<FormData>({
    firstName: '',
    lastName: '',
    age: 0,
    username: '',
    email: '',
    isAdmin: false
  });

  // Passing the form model to the form function
  loginForm = form(this.formModel);

  ngOnInit() {
    // This is how we can set the value of a form field
    this.loginForm.firstName().value.set('John');
  }

  handleClick() {
    // This is how we can get the value of the form
    console.log(this.loginForm().value());
  }
}
