import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { LogDirective } from '../log.directive';

@Component({
  selector: 'app-paragraph',
  standalone: true,
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  hostDirectives: [{
    directive: LogDirective,
    inputs: ['text: paraText']
  }]
})
export class ParagraphComponent {
  content = input.required<string>();
}
