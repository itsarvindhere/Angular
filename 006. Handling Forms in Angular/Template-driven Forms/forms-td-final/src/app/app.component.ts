import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // When Form is submitted, this method gets called
  // onSubmit(f: NgForm) {
  //   console.log("Form Submitted!", f);
  // }

    onSubmit() {
      console.log(this.signupForm);
    }

}
