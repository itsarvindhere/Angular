import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signupForm: FormGroup;

  ngOnInit() {
    // Initialize the Form
    this.signupForm = new FormGroup({

      // Form Group inside a Form Group
      userData: new FormGroup({
        username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
      }),
      gender: new FormControl('male')
    });
  }

  // Handle Form Submission
  onSubmit(){
    console.log(this.signupForm);
  }

}
