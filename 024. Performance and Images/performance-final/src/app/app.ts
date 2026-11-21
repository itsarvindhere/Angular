import { Component, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HeavyPipe, heavy, runs } from './heavy';

interface ImgRow {
  name: string;
  loading: string;
  fetchpriority: string;
  srcset: string;
}

@Component({
  imports: [NgOptimizedImage, HeavyPipe],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly host = inject(ElementRef<HTMLElement>);

  // Images: what NgOptimizedImage generated for each <img>
  protected readonly imgRows = signal<ImgRow[]>([]);

  // Slow computations
  protected readonly n = signal(50000);
  protected readonly note = signal('');
  protected readonly heavyComputed = computed(() => {
    runs.computed++;
    return heavy(this.n());
  });
  protected readonly counts = signal({ ...runs });

  constructor() {
    inject(Title).setTitle('Performance demo');

    afterNextRender(() => {
      const imgs = (this.host.nativeElement as HTMLElement).querySelectorAll('img');
      this.imgRows.set(
        Array.from(imgs).map((img) => ({
          name: img.getAttribute('data-name') ?? '',
          loading: img.getAttribute('loading') ?? '-',
          fetchpriority: img.getAttribute('fetchpriority') ?? '-',
          srcset: img.getAttribute('srcset') ?? '-',
        })),
      );
    });
  }

  // Called directly from the template. It runs again on every check of this component.
  protected heavyMethod(n: number): number {
    runs.method++;
    return heavy(n);
  }

  protected refreshCounts() {
    this.counts.set({ ...runs });
  }
}
