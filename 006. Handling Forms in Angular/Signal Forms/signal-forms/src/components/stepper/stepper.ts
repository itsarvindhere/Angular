import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
})
export class Stepper implements FormValueControl<number> {
  value = model(0);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  invalid = input(false);
  touched = model(false);
  min = input<number | undefined>(undefined);

  increment() {
    this.touched.set(true);
    this.value.update((v) => v + 1);
  }

  decrement() {
    this.touched.set(true);
    this.value.update((v) => v - 1);
  }
}
