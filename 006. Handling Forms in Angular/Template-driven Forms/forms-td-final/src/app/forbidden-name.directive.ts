import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[forbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true}],
  standalone: false
})
export class ForbiddenNameDirective implements Validator, OnInit{

  
  @Input('forbiddenName')
  invalidName: string;

  constructor() { }

  ngOnInit(){
    // Default value as "admin" if not passed from outside
    if (!this.invalidName) this.invalidName = "admin";
  }

  validate(control: AbstractControl<any, any>): ValidationErrors {

    if (control.value === this.invalidName) {
      return {"forbiddenName": true, "notAllowed": this.invalidName}
    }

    return null;
  }
}
