import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngNotIf]',
  standalone: false
})
export class NgNotIfDirective {

  // Get the condition as an input
  // Let's name it same as the selector
  // So that we can set it simply as [ngNotIf]="condition"
  @Input('ngNotIf') 
  set do_something(condition: boolean) {
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  // Get a reference to the template that we want to render based on condition

  // Also get reference to the view container. That is, where to render this template on the DOM.
  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

}
