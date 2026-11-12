import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="decrement()">-</button>
    {{ value() }}
    <button (click)="increment()">+</button>
  `
})
export class CounterComponent {
  // Gives us both an input "value" and an output "valueChange"
  value = model(0);

  increment() {
    this.value.update(v => v + 1);
  }

  decrement() {
    this.value.update(v => v - 1);
  }
}
