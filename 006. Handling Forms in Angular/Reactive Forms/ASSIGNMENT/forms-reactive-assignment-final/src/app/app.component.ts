import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // Project Form
  projectForm: FormGroup;

  ngOnInit() {
    // Define the Form
    this.projectForm = new FormGroup({
      projectName: new FormControl('', [Validators.required, this.forbiddenName]),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl('stable')
    })
  }

  // Custom Validator to not allow "Test" as project name
  forbiddenName = (control: FormControl) : ValidationErrors => {
    const controlValue = control.value as string;
    // If value entered is "test" then not allowed
    // To make it better, we will also not allow any combination
    // For example, "tESt", "tEsT", "TEST" and so on...
    if (controlValue && controlValue.trim().toLowerCase() === 'test'){
      return {'forbiddenName': true}
    } 

    return null;
  }

  // Submit the form
  createProject() {
    console.log(this.projectForm.value)

    // Reset the form
    this.projectForm.reset();
  }

}
