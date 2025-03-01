import { Component, inject, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit() {
    // Initialize the Form (Without Form Builder)
    this.signupForm = new FormGroup({

      // Form Group inside a Form Group
      userData: new FormGroup({
        username: new FormControl('', {
          validators: [
            Validators.required, 
            CustomValidators.forbiddenNameValidator(["admin", "sudo"])]
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          asyncValidators: [CustomValidators.forbiddenEmailValidator()],
          updateOn: 'blur'
        })
      }, {
        validators: [CustomValidators.sameEmailAsUsernameValidator()]
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

    // Initialize the Form (With Form Builder)
    // this.signupForm = this.fb.group({
    //   userData: this.fb.group({
    //     username: ['', {
    //       validators: [Validators.required, this.forbiddenName]
    //     }],
    //     email: ['', {
    //       validators: [Validators.required, Validators.email],
    //       asyncValidators: [this.forbiddenEmail],
    //       updateOn: 'blur'
    //     }]
    //   }),
    //   gender: [''],
    //   hobbies: this.fb.array([])
    // });

    this.signupForm.get('userData.email').valueChanges.subscribe(data => console.log(data));

    // this.signupForm.setValue({
    //   userData: {
    //     username: "John",
    //     email: "test@gmail.com"
    //   },
    //   gender: 'male',
    //   hobbies: []
    // })

    this.signupForm.patchValue({
      userData: {
        email: "test@gmail.com"
      }
    })


  }

  // Handle Form Submission
  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset({
      gender: 'male'
    });
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
