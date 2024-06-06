import { NgFor } from '@angular/common';
import { Component, computed, signal, effect, input, output } from '@angular/core';
import { interval, of } from 'rxjs';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
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
    effect(() =>  {
      console.log("Something changed!")
      console.log("Counter value is", this.counter())
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

