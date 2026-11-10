import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css'],
  standalone: false
})
export class EvenComponent {

  @Input()
  gameValue !: number;

}
