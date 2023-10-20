import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      username: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl('male')
    });
  }

  // Handle Form Submission
  onSubmit(){
    console.log(this.signupForm);
  }

}
