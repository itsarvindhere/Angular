import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialNavComponent } from './material-nav/material-nav.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MaterialNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-config';
}
