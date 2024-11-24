import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]',
  host: {
    '[style.backgroundColor]': 'backgroundColor',
    '(mouseenter)': 'onMouseHover()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class BasicHighlightDirective implements OnInit {

  @Input('appBasicHighlight') highlightColor: string = 'green';
  backgroundColor: string;

  constructor() {}

  // ngOnInit
  ngOnInit(): void {}

  onMouseHover() {
    // console.log("Element on which event occured is", element)
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', "green");
    this.backgroundColor = this.highlightColor;
  }

  onMouseLeave() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', "transparent");
    this.backgroundColor = 'transparent';
  }

}
