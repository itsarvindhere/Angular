import { Component } from '@angular/core';
import { ParagraphComponent } from './paragraph/paragraph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5];

  oddNumbers = [1,3,5]
  evenNumbers = [2,4,6]

  onlyOdd = false;

  condition = true;

  day = 0
}
