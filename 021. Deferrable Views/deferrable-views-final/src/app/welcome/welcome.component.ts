import { Component } from '@angular/core';

import { OfferPreviewComponent } from '../offer-preview/offer-preview.component';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.css',
    imports: [OfferPreviewComponent]
})
export class WelcomeComponent {}
