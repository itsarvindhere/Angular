import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  @ViewChild('userData')
  userDataGroup : NgModelGroup;
  
  defaultQuestion = "pet";
  answer = '';

  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    gender: '',
    secretQuestion: '',
    answer: ''
  }

  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    console.log(this.userDataGroup);

    // METHOD #1
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //     gender: ''
    //   },
    //   secret: 'pet'
    // })

    // METHOD #2
    // this.signupForm.form.patchValue({
    //   userData: {
    //     username: suggestedName
    //   }
    // })

    // METHOD #3
    // (this.signupForm.controls["userData"] as FormGroup).controls["username"].setValue(suggestedName);

    // METHOD #4
    this.userDataGroup.control.controls["username"].setValue(suggestedName);
  }

  // When Form is submitted, this method gets called
  // onSubmit(f: NgForm) {
  //   console.log("Form Submitted!", f);
  // }

    onSubmit() {
      this.submitted = true;
      this.user.username = this.signupForm.value.userData.username;
      this.user.email = this.signupForm.value.userData.email;
      this.user.gender = this.signupForm.value.userData.gender;
      this.user.secretQuestion = this.signupForm.value.secret;
      this.user.answer = this.signupForm.value.questionAnswer;

      // this.signupForm.reset();
      this.signupForm.resetForm();
    }
}
