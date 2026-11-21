import { Pipe, PipeTransform } from '@angular/core';

/** How many times each version of the calculation really ran. */
export const runs = { method: 0, pipe: 0, computed: 0 };

/** A stand-in for slow work: sums the squares of 1..n. */
export function heavy(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i * i;
  }
  return total;
}

/** A pure pipe only runs again when its input value changes. */
@Pipe({ name: 'heavy' })
export class HeavyPipe implements PipeTransform {
  transform(n: number): number {
    runs.pipe++;
    return heavy(n);
  }
}
