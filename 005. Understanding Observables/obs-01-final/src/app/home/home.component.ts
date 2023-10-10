import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription, interval} from 'rxjs';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() { }

  sub : Subscription;
  customSub: Subscription;

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

    this.customSub = customIntervalObs.subscribe({
      next: data => console.log("Data received", data),
      error: err => console.log("Error", err),
      complete: () => console.log("Observable Completed")
    })
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
    this.customSub.unsubscribe();
  }

}
