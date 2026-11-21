import { ErrorHandler, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ErrorLog } from './error-log';

/**
 * Replaces Angular's default ErrorHandler (which only writes to the console).
 * A real app would also send the error to a tracking service here.
 */
export class GlobalErrorHandler implements ErrorHandler {
  private readonly log = inject(ErrorLog);
  private readonly document = inject(DOCUMENT);

  handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    this.log.add({
      time: new Date().toLocaleTimeString(),
      page: this.document.location.pathname,
      message,
    });
    console.error('GlobalErrorHandler', error);
  }
}
