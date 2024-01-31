import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isShown: boolean = false;

  fadeInOut() {
    this.isShown = !this.isShown;
  }
}
