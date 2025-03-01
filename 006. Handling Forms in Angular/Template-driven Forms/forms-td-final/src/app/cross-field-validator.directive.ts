import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[crossFieldValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: CrossFieldValidatorDirective, multi: true}],
  standalone: false
})
export class CrossFieldValidatorDirective implements Validator {

  constructor() { }
  
  /**
   * Validate that the name is not the same as username
   */
  validate(form: FormGroup): ValidationErrors | null {
    const name = form.get('name');
    const username = form.get('username');

    if(name && username && name.value && username.value && name.value === username.value) {
      return { "nameSameAsUsername": true }
    }

    return null;
  }

}
