import { Component } from '@angular/core';
import { HighlightDirective } from '../../shared/highlight.directive';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    imports: [HighlightDirective]
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
