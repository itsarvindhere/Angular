import { Component, input, InputSignal } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-child2',
  standalone: true,
  imports: [],
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.css'
})
export class Child2Component {
  constructor(private dataService: DataService){}

  text = this.dataService.submittedValue;
}
