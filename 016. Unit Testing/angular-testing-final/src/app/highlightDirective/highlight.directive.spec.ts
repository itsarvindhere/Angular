import { Component } from "@angular/core";
import { HighlightDirective } from "./highlight.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
    standalone: true,
    template: ` <h2 highlight="yellow">Something Yellow</h2>
      <h2 highlight>The Default (Gray)</h2>
      <h2>No Highlight</h2>
      <input #box [highlight]="box.value" value="cyan" />`,
    imports: [HighlightDirective],
  })
  class TestComponent {}


//   TESTS

describe("HighlightDirective", () => {

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HighlightDirective, TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });


    it('should have three highlighted elements', () => {

        const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));

        expect(elements.length).toBe(3);
    });

    it('should have 1st <h2> with a background color "yellow"', () => {

        const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));

        expect(elements.at(0)?.nativeElement.style.backgroundColor).toBe("yellow");
    });

    it('should have 2nd <h2> with a default background color', () => {
        const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));

        const directive = elements.at(1)?.injector.get(HighlightDirective) as HighlightDirective;

        expect(elements.at(1)?.nativeElement.style.backgroundColor).toBe(directive.defaultColor);
    });

    it('should bind <input> background to the "value" color', () => {
        const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));

        const input = elements[2].nativeElement as HTMLInputElement;

        expect(input.style.backgroundColor).toBe('cyan');

        input.value = "green";

        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(input.style.backgroundColor).toBe('green');
    });


    it('h2 element that does not use the directive should not have a customProperty', () => {
        const h2 = fixture.debugElement.query(By.css("h2:not([highlight])"));

        expect(h2.properties['customProperty']).toBeUndefined;
    });
});
