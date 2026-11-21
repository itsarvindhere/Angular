import { Component, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Api } from './api';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly api = inject(Api);
  protected readonly lastNavigation = signal('-');
  protected readonly navigationError = signal('');

  constructor() {
    inject(Title).setTitle('Route resources demo');

    const router = inject(Router);
    let startedAt = 0;
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        startedAt = performance.now();
        this.navigationError.set('');
      } else if (event instanceof NavigationEnd) {
        this.lastNavigation.set(`${Math.round(performance.now() - startedAt)} ms to ${event.urlAfterRedirects}`);
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        const reason = event instanceof NavigationError ? event.error?.message : event.reason;
        this.navigationError.set(`Navigation to ${event.url} did not finish: ${reason}`);
      }
    });
  }
}
