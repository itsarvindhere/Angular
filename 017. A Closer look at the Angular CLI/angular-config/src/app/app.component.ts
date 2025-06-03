import { Component } from '@angular/core';
import { MaterialNavComponent } from './material-nav/material-nav.component';

@Component({
    selector: 'app-root',
    imports: [MaterialNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-config';
}
