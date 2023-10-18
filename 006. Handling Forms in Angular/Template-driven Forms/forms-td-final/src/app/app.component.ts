import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  @ViewChild('userData')
  userDataGroup : NgModelGroup;
  
  defaultQuestion = "pet";
  answer = '';

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // When Form is submitted, this method gets called
  // onSubmit(f: NgForm) {
  //   console.log("Form Submitted!", f);
  // }

    onSubmit() {
      console.log("Form Data", this.signupForm);
      console.log("User Data", this.userDataGroup);
    }

    print(data) {
      console.log(data)
    }

}
