import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }

  // Handle Form Submission
  onSubmit(){
    console.log(this.signupForm);
  }

  // On click of "Add Hobby" button
  handleAddHobbyClick(){
    // Add a new control to the FormArray
    // We will also add a "requied" validator to the new control
    const newInput = new FormControl('', Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(newInput);
  }

  // To get the controls in Form Array
  getHobbiesControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  // Delete a hobby
  deleteHobby(i: number) {
    (this.signupForm.get('hobbies') as FormArray).removeAt(i);
  }

}
