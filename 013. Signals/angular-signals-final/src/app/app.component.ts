import { Component } from '@angular/core';

import { DefaultComponent } from './default/default.component';
import { SignalsComponent } from './signals/signals.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [DefaultComponent, SignalsComponent]
})
export class AppComponent {

    showAlert(val: string) {
        alert("Data passed by child is -> " + val);
    }
}
