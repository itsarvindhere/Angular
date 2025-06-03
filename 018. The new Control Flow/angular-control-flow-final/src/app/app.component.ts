import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
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
