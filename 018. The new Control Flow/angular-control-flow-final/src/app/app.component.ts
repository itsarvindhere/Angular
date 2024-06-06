import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isApple: boolean = true;
  toggleFruit() {
    this.isApple = !this.isApple;
  }

  fruit: string = '';
  selectFruit(fruit: string) {
    this.fruit = fruit;
  }

  fruits: string[] = ['Apple', 'Orange', 'Banana', 'Mango'];
}
