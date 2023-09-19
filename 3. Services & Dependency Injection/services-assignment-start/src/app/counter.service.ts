import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private activeOperationCount = 0;
  private inactiveOperationCount = 0;

  constructor() { }

  setToActiveClicked = new EventEmitter();
  setToInactiveClicked = new EventEmitter();


  getActiveOperationCount() { 
    return this.activeOperationCount;
  }

  getInactiveOperationCount() { 
    return this.inactiveOperationCount;
  }

  incrementActiveOperationCount(){
    this.activeOperationCount++;
  }

  incrementInactiveOperationCount(){
    this.inactiveOperationCount++;
  }



}
