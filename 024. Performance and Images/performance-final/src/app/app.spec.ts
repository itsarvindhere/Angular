import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { appConfig } from './app.config';
import { HeavyPipe, heavy, runs } from './heavy';

describe('heavy calculation', () => {
  it('sums the squares of 1..n', () => {
    expect(heavy(3)).toBe(14);
  });

  it('is counted by the pipe', () => {
    const before = runs.pipe;
    new HeavyPipe().transform(10);
    expect(runs.pipe).toBe(before + 1);
  });
});

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App], providers: appConfig.providers }).compileComponents();
  });

  it('renders the heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Performance demo',
    );
  });

  it('runs the computed signal once, however often the template is checked', async () => {
    const before = runs.computed;
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.componentInstance['note'].set('a');
    await fixture.whenStable();
    fixture.componentInstance['note'].set('ab');
    await fixture.whenStable();
    expect(runs.computed).toBe(before + 1);
  });
});
