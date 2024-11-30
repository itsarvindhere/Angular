import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  submittedValue = signal<string>('');

  constructor() { 
  }

  updateValue(val: string) {
    this.submittedValue.set(val);
  }

}
