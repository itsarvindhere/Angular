import { Component, OnInit, OnDestroy, signal, inject, Injector, Signal } from '@angular/core';
import { UserService } from './user.service';
import { interval, Observable, Subscription } from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  count = signal(0);
  // count$ = toObservable(this.count);
  count$: Observable<number>;

  private injector = inject(Injector);

  interval$ = interval(1000);
  intervalSignal: Signal<number>;

  constructor(private userService: UserService) {
    // this.count$ = toObservable(this.count);
    // this.intervalSignal = toSignal(this.interval$);
  }

  userActivated = false;
  activatedSub: Subscription;

  ngOnInit() {

    this.count$ = toObservable(this.count, {injector: this.injector});

    this.intervalSignal = toSignal(this.interval$, {
      injector: this.injector,
      initialValue: 1
    });

    this.activatedSub = this.userService.activatedEmitter.subscribe(data => {
      this.userActivated = data;
    })
  }
  
  ngOnDestroy(): void {
      this.activatedSub.unsubscribe();
  }
}
