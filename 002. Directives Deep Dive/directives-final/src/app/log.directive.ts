import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'
  }
})
export class LogDirective {
  elementRef = inject(ElementRef);

  text = input.required<string>();

  onLog() {
    console.log("LOGGING THE TEXT: " + this.text());
    console.log(this.elementRef.nativeElement);
  }
}
