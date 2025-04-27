import { NgFor } from '@angular/common';
import { Component, computed, signal, effect, input, output, linkedSignal } from '@angular/core';
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

  options = signal(['Option 1', 'Option 2', 'Option 3']);
  // selectedOption = signal(this.options()[0]);
  selectedOption = linkedSignal<string[], string>({
    source: this.options,
    computation: (newOptions, previous) => {
      if (previous && newOptions.includes(previous?.value)) {
        return previous?.value;
      }
      return newOptions[0];
    }
  });
  
  constructor() {
    const effectRef = effect((onCleanup) =>  {
      console.log("Something changed!")
      console.log("Counter value is", this.counter());
      onCleanup(() => {
        console.log("Some Cleanup code Here");
      });
    }, {
      manualCleanup: true
    });

    effectRef.destroy();
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
  
  updateSelectedOption(event: any) {
    this.selectedOption.set(event.target.value);
  }

  addNewOption() {
    this.options.update(prev => ['New Option', ...prev]);
  }

  addNewOptionAtTheEnd() {
    this.options.update(prev => [...prev, 'New Option']);
  }
}
function outputFromObservable<T>() {
  throw new Error('Function not implemented.');
}

