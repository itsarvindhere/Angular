import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {

  isShown: boolean = false;
  items: string[] = [];

  fadeInOut() {
    this.isShown = !this.isShown;
  }

  addItem(name: string) {
    this.items.push(name);
  }

  deleteItem(index: number) {
    this.items.splice(index, 1)
  }
}

