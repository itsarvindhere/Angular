import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { debounceTime, delay, map, Observable, of, switchMap, timer } from 'rxjs';

@Directive({
  selector: '[validateUsername]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidateUsernameDirective,
      multi: true,
    },
  ],
  standalone: false
})
export class ValidateUsernameDirective implements AsyncValidator {

  constructor() { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(500).pipe(
      switchMap(() => {
        return of(control.value)
            .pipe(
              map(val => {
                console.log("Map Called")
                return val === "admin" ? {'validateUsername': true} : null
              }
              ),
              delay(1500)
            )
    }))
  }

}
