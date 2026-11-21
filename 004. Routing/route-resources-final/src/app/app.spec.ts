import { TestBed } from '@angular/core/testing';
import { Api } from './api';
import { App } from './app';
import { appConfig } from './app.config';

describe('Api', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns a known user after a delay', async () => {
    const api = TestBed.inject(Api);
    const request = api.getUser('1');
    await vi.advanceTimersByTimeAsync(900);
    expect((await request).name).toBe('Ada Lovelace');
  });

  it('rejects for an unknown user', async () => {
    const api = TestBed.inject(Api);
    const request = api.getUser('99');
    const outcome = expect(request).rejects.toThrow('no user with id 99');
    await vi.advanceTimersByTimeAsync(900);
    await outcome;
  });

  it('counts every request', async () => {
    const api = TestBed.inject(Api);
    const request = api.getActivity('1', 'week');
    await vi.advanceTimersByTimeAsync(700);
    await request;
    expect(api.calls().activity).toBe(1);
  });
});

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('renders the heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Route resources demo',
    );
  });
});
