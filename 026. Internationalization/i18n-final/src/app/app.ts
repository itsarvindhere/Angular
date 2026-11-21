import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de';

// A locale that is not one of the app's own locales needs its data registered first.
// (The app's own locales, like fr and es, are registered by the build for us.)
registerLocaleData(localeDe);

type Gender = 'male' | 'female' | 'other';

@Component({
  imports: [DatePipe, CurrencyPipe, DecimalPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // The locale of the build that is running right now (en-US, fr or es)
  protected readonly locale = inject(LOCALE_ID);

  // 3. Text in code, marked with $localize
  protected readonly userName = 'Arvind';
  protected readonly greeting = $localize`:@@welcomeMessage:Hello, ${this.userName}:name:!`;

  // 4. State for the plural and select examples
  protected readonly minutes = signal(0);
  protected readonly gender = signal<Gender>('other');

  // 5. Values for the pipes
  protected readonly today = new Date();
  protected readonly price = 1234.5;

  constructor() {
    inject(Title).setTitle($localize`:@@documentTitle:Internationalization demo`);
  }

  protected changeMinutes(by: number) {
    this.minutes.update((m) => Math.max(0, m + by));
  }
}
