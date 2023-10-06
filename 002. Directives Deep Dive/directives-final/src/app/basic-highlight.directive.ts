import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

  @Input('appBasicHighlight') highlightColor: string = 'green';

  @HostBinding('style.background-color')
  backgroundColor: string;

  constructor() {}

  // ngOnInit
  ngOnInit(): void {
    
  }

  // HostListener
  @HostListener('mouseenter', ['$event.target']) 
  onMouseHover(element) {
    // console.log("Element on which event occured is", element)
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', "green");
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', "transparent");
    this.backgroundColor = 'transparent';
  }


}
