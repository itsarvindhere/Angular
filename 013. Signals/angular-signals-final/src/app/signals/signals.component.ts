import { NgFor } from '@angular/common';
import { Component, computed, signal, effect } from '@angular/core';

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
}
