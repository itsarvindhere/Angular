import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Element } from '../Element.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{

  @ViewChild('heading', {static: true})
  heading: ElementRef

  @ContentChild('projectedParagraph', {static: true})
  projectedParagraph: ElementRef;

  @ViewChildren('para')
  para: QueryList<ElementRef>;

  private _element: Element;
  // Get this value as an input from the parent component
  // Hence, we are using the @Input decorator here
  @Input('serverElement')
  get element (): Element { return this._element };
  set element(element: Element) {
    this._element = element;
    if (!this._element.name) {
      this._element.name = "Default Server Name";
    }

    if (!this._element.content) {
      this._element.content = "Default Server Content";
    }

  }

  
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnChanges(): void {
      console.log("ngOnChanges called")
  }

  ngOnInit(): void {
    console.log("ngOnInit called")
    console.log("ngOnInit. Heading is ", this.heading)
    console.log("ngOnInit. Heading content is ", this.heading.nativeElement.textContent)
    console.log("ngOnInit. Projected Paragraph Content is ", this.projectedParagraph.nativeElement.textContent)
    console.log("Elements with same reference variables 'para'", this.para?.forEach((element: ElementRef) => console.log(element)))
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called")
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called")
    console.log("ngAfterContentInit. Heading is ", this.heading)
    console.log("ngAfterContentInit. Heading content is ", this.heading.nativeElement.textContent)
    console.log("ngAfterContentInit. Projected Paragraph Content is ", this.projectedParagraph.nativeElement.textContent)
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called")
    console.log("ngAfterContentChecked. Heading is ", this.heading)
    console.log("ngAfterContentChecked. Heading content is ", this.heading.nativeElement.textContent)
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called")
    console.log("ngAfterViewInit. Heading is ", this.heading)
    console.log("ngAfterViewInit. Heading content is ", this.heading.nativeElement.textContent)
    console.log("Elements with same reference variables 'para'", this.para.forEach((element: ElementRef) => console.log(element)))
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called")
    console.log("ngAfterViewChecked. Heading is ", this.heading)
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called")
  }


}
