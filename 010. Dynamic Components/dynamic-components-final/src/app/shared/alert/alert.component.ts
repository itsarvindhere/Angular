import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  // Message to show in the Alert Modal
  // It will be passed from outside
  @Input() message !: string;

  // Event to emit when close button is clicked
  @Output() close = new EventEmitter();

  // Method executed on click of the close button or the backdrop
  onClose() {
    // Emit the event
    this.close.emit();
  }


}
