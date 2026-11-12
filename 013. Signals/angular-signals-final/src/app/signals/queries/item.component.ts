import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item',
  template: `<span>{{ label() }}</span>`
})
export class ItemComponent {
  label = input.required<string>();
}
