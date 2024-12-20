import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css'],
  standalone: false
})
export class OddComponent implements OnInit {

  @Input()
  gameValue: Number;

  constructor() { }

  ngOnInit(): void {
  }

}
