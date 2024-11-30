import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-child1',
  standalone: true,
  imports: [],
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.css'
})
export class Child1Component {

  constructor(private dataService: DataService){}

  onInput(val: string) {
    this.dataService.updateValue(val);
  }

}
