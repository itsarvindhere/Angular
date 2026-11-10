import { Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
  standalone: false
})
export class GameControlComponent {

  @Output()
  gameStarted = new EventEmitter<Number>();

  value = 1

  // Reference to the interval
  intervalRef: number | undefined;

  startGame() {
    this.intervalRef = setInterval(() => this.gameStarted.emit(this.value++), 1000)
  }

  stopGame() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }

}
