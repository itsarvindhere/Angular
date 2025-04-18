import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { delay, map, Observable, of } from "rxjs";

/**
 * Custom Form Validators
 */
export class CustomValidators {

    /**
     * Forbidden Name Validator (Synchronous)
     */
    public static forbiddenNameValidator(forbiddenNames: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          if (forbiddenNames.includes(control.value)){
            return { 
              "forbiddenName": true, 
              "notAllowed": control.value
            }
          };
          return null;
        }
    } 

    /**
     * Forbidden Email Validator (Asynchronous)
     */
    public static forbiddenEmailValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return of(control.value).pipe(
                map(val => val === 'test@test.com' ? {'forbiddenEmail' : true} : null), 
                delay(1500)
            )
        }
    }

    /**
     * Same Email as Username Validator (Synchronous)
     */
    public static sameEmailAsUsernameValidator(): ValidatorFn {
      return (form: FormGroup): ValidationErrors | null => {
        const email = form.get('email');
        const username = form.get('username');

        if (email && username && email.value && username.value && email.value === username.value) {
          return { "sameEmailAsUsername": true }
        }

        return null;
      }
    }
}