import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  // Message to show in the Alert Modal
  // It will be passed from outside
  @Input() message !: string;
}
