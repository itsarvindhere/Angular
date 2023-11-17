import { Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  // Message to show in the Alert Modal
  message !: string;

  // Event to emit when close button is clicked
  close = new EventEmitter();

  // Method executed on click of the close button or the backdrop
  onClose() {
    // Emit the event
    this.close.emit();
  }


}
