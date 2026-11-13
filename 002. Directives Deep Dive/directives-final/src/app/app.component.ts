import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { NgStyle, NgClass } from '@angular/common';
import { BasicHighlightDirective } from './basic-highlight.directive';
import { NgNotIfDirective } from './ng-not-if.directive';
import { LogDirective } from './log.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NgStyle, NgClass, BasicHighlightDirective, NgNotIfDirective, LogDirective, ParagraphComponent]
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5];

  oddNumbers = [1,3,5]
  evenNumbers = [2,4,6]

  onlyOdd = false;

  condition = true;

  day = 0
}
