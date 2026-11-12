import { afterNextRender, Component, computed, ElementRef, viewChild, viewChildren } from '@angular/core';
import { ItemComponent } from './item.component';

@Component({
  selector: 'app-queries',
  imports: [ItemComponent],
  template: `
    <input #nameInput placeholder="I get the focus after the first render" />

    <div>
      @for (name of names; track name) {
        <app-item [label]="name" />
      }
    </div>

    <p>Items rendered: {{ itemCount() }}</p>
  `
})
export class QueriesComponent {
  names = ['One', 'Two', 'Three'];

  // Signal queries replace @ViewChild() and @ViewChildren()
  nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  items = viewChildren(ItemComponent);

  // The result of a query is a signal, so we can derive values from it
  itemCount = computed(() => this.items().length);

  constructor() {
    // The element is available only after Angular has rendered the component
    afterNextRender(() => {
      this.nameInput()?.nativeElement.focus();
    });
  }
}
