import { Injectable, signal } from '@angular/core';

export interface LoggedError {
  time: string;
  page: string;
  message: string;
}

/** Keeps the errors that reached the global ErrorHandler, so the page can show them. */
@Injectable({ providedIn: 'root' })
export class ErrorLog {
  readonly entries = signal<LoggedError[]>([]);

  add(entry: LoggedError) {
    this.entries.update((list) => [entry, ...list]);
  }

  clear() {
    this.entries.set([]);
  }
}
