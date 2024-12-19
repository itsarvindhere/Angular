import { NgFor } from '@angular/common';
import { Component, computed, signal, effect, input, output } from '@angular/core';
import { interval, of } from 'rxjs';
import { Child1Component } from './child1/child1/child1.component';
import { Child2Component } from './child2/child2/child2.component';

@Component({
    selector: 'app-signals',
    templateUrl: './signals.component.html',
    imports: [NgFor, Child1Component, Child2Component]
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2)

  // Traditional Approach
  // @Input({required: true})
  // test !: string;

  // Signal Inputs
  test = input.required<string>();
  derived = computed(() => this.test() + ". Added at the end");

  btnClicked = output<string>();

  
  constructor() {
    effect((onCleanup) =>  {
      console.log("Something changed!")
      console.log("Counter value is", this.counter());
      onCleanup(() => {
        console.log("Some Cleanup code Here");
      });
    });
  }
  

  increment() {
    this.counter.update(prev => prev + 1) ;
    this.actions.update(prev => [...prev, 'INCREMENT']);
  }

  decrement() {
    this.counter.update(prev => prev - 1) ;
    this.actions.update(prev => [...prev, 'DECREMENT']);
  }

  onClick() {
    this.btnClicked.emit("Data sent from Child to Parent!");
  }
}
function outputFromObservable<T>() {
  throw new Error('Function not implemented.');
}

