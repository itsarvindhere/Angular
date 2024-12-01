import { Injectable, Signal, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Private so that it cannot be modified directly from outside
  private _submittedValue = signal<string>('');

  // Public readonly computed signal that can be read from outside
  submittedValue = computed(() => this._submittedValue());

  constructor() { 
  }

  updateValue(val: string) {
    this._submittedValue.set(val);
  }

}
