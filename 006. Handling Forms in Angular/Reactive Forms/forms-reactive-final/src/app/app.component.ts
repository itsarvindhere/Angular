import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenNames = ['admin', 'sudo']
  signupForm: FormGroup;

  ngOnInit() {
    // Initialize the Form
    this.signupForm = new FormGroup({

      // Form Group inside a Form Group
      userData: new FormGroup({
        username: new FormControl('', [Validators.required, this.forbiddenName]),
      email: new FormControl('', [Validators.required, Validators.email], [this.forbiddenEmail])
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

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

  // Forbidden Name Validator
  forbiddenName = (control: FormControl): ValidationErrors => {

    if (this.forbiddenNames.includes(control.value)){
      return {"forbiddenName": true, "notAllowed": control.value}
    }

    return null
  }

  // Forbidden Email Validator
  forbiddenEmail = (control: FormControl): Promise<any> | Observable<any> => {

    // RXJS
    return of(control.value).pipe(map(val => val === 'test@test.com' ? {'forbiddenEmail' : true} : null), delay(1500))

    
    // return new Observable(observer => {
    //   // To mimic an async operation that waits for some time
    //   setTimeout(() => {
    //     if (control.value === 'test@test.com') {
    //       observer.next({'forbiddenEmail': true})
    //     }
    //     observer.complete()
    //   }, 1500)
    // })
  }

}
