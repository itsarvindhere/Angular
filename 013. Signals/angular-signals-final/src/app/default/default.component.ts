
import { Component } from '@angular/core';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    imports: []
})
export class DefaultComponent {
  actions: string[] = [];
  counter = 0;

  increment() {
    this.counter++;
    this.actions.push('INCREMENT');
  }

  decrement() {
    this.counter--;
    this.actions.push('DECREMENT');
  }
}
