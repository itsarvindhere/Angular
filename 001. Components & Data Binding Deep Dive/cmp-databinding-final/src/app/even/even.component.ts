import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css'],
  standalone: false
})
export class EvenComponent implements OnInit {

  @Input()
  gameValue: Number;

  constructor() { }

  ngOnInit(): void {
  }

}
