import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() { }

  randomNumObs = new Subject<number>();

  sub : Subscription;
  customSub: Subscription;

  randomNumSub1: Subscription;
  randomNumSub2: Subscription;

  ngOnInit() {
    // this.sub = interval(1000).subscribe({
    //   next: count => {console.log(count)}
    // })

    const customIntervalObs = new Observable(observer => {
      let data = 0;
      setInterval(() => {
        if (data > 3) {
          observer.complete();
        }
        if (data > 3) {
          observer.error("Invalid Number")
        }
        observer.next(data++);
      }, 1000)
    });

    const newCustomObs = customIntervalObs.pipe(
    filter((val: number) => val % 2 === 0), 
    map((val: number) => "Value emitted is " + val));

    this.customSub = newCustomObs.subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
      complete: () => console.log("Observable Completed")
    });

    this.randomNumSub1 = this.randomNumObs.subscribe(data => {
      console.log("Inside Random Num Sub 1. Data is ", data)
    });

    this.randomNumSub2 = this.randomNumObs.subscribe(data => {
      console.log("Inside Random Num Sub 2. Data is ", data)
    })

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
    this.customSub.unsubscribe();

    this.randomNumSub1.unsubscribe();
    this.randomNumSub2.unsubscribe();


  }

  buttonClick() {
    this.randomNumObs.next(Math.random());
  }


}
