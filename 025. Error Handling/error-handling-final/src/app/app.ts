import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { ErrorLog } from './error-log';

@Component({
  imports: [AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly log = inject(ErrorLog);

  // 5. Expected error, handled where it happens
  protected readonly friendly = signal('');

  // 6. A resource keeps its own error state. Nothing is sent to the ErrorHandler.
  private readonly url = signal<string | undefined>(undefined);
  protected readonly posts = httpResource<unknown>(() => this.url());

  // 4. The async pipe forwards errors to the ErrorHandler
  protected readonly showAsync = signal(false);
  protected readonly failing$ = throwError(() => new Error('The observable failed (async pipe)'));

  constructor() {
    inject(Title).setTitle('Error handling demo');
  }

  // 1. Angular runs event handlers itself, so it catches this error
  protected throwInHandler() {
    throw new Error('Thrown in a click handler');
  }

  // 2. Nobody handles the rejection, so the window "unhandledrejection" listener sees it
  protected rejectPromise() {
    Promise.reject(new Error('Unhandled promise rejection'));
  }

  // 3. A timer callback is not run by Angular, so this reaches the window "error" listener
  protected throwInTimer() {
    setTimeout(() => {
      throw new Error('Thrown inside setTimeout');
    });
  }

  // 5. try/catch: the error is expected, so the user gets a message and nothing is logged globally
  protected parseBadJson() {
    try {
      JSON.parse('{ not valid json');
      this.friendly.set('');
    } catch {
      this.friendly.set('That text is not valid JSON. Please check it and try again.');
    }
  }

  protected loadFromDeadServer() {
    // Nothing listens on port 1, so the request fails straight away
    this.url.set('http://localhost:1/posts.json');
  }
}
