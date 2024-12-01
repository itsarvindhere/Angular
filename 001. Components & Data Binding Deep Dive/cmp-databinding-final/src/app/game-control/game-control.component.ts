import { Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output()
  gameStarted = new EventEmitter<Number>();

  value = 1

  // Reference to the interval
  intervalRef;

  constructor(private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    const interval = setInterval(() => {
      console.log("Hello World!");
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  startGame() {
    this.intervalRef = setInterval(() => this.gameStarted.emit(this.value++), 1000)
  }

  stopGame() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }

}
