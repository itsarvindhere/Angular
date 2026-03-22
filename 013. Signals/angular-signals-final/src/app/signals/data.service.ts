import { Injectable, Signal, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Private so that it cannot be modified directly from outside
  private _submittedValue = signal<string>('');

  // Public readonly computed signal that can be read from outside
  submittedValue = this._submittedValue.asReadonly();

  constructor() { 
  }

  updateValue(val: string) {
    this._submittedValue.set(val);
  }

  async fetchUser(params: {id: number}) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/' + params.id);
    return response.json();
  }

}
