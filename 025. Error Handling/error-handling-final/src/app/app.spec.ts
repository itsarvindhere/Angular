import { TestBed } from '@angular/core/testing';
import { ErrorHandler } from '@angular/core';
import { App } from './app';
import { appConfig } from './app.config';
import { ErrorLog } from './error-log';
import { GlobalErrorHandler } from './global-error-handler';

describe('GlobalErrorHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('writes the error message to the error log', () => {
    TestBed.inject(ErrorHandler).handleError(new Error('boom'));
    expect(TestBed.inject(ErrorLog).entries()[0].message).toBe('boom');
  });

  it('also accepts values that are not Error objects', () => {
    TestBed.inject(ErrorHandler).handleError('plain text');
    expect(TestBed.inject(ErrorLog).entries()[0].message).toBe('plain text');
  });
});

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('shows a friendly message for an expected error and logs nothing globally', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    (fixture.componentInstance as any).parseBadJson();
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('not valid JSON');
    expect(TestBed.inject(ErrorLog).entries().length).toBe(0);
  });
});
