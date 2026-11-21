import { Component, input } from '@angular/core';
import { Resource } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Activity, User } from './api';

@Component({
  selector: 'app-home',
  template: `
    <h2>Route resources demo</h2>
    <p>Pick a user above. The two versions load the same data. Watch the "Last navigation" time at the top.</p>
  `,
})
export class Home {}

// ---------------------------------------------------------------- route resources

@Component({
  selector: 'app-user-page',
  imports: [RouterLink, RouterOutlet],
  template: `
    <h2>{{ user().name }} <span class="muted">({{ user().role }})</span></h2>
    <p>
      <a [routerLink]="[]" [queryParams]="{ range: 'week' }">Activity: week</a>
      <a [routerLink]="[]" [queryParams]="{ range: 'month' }">Activity: month</a>
      <a [routerLink]="['feed']">Feed (non-blocking)</a>
    </p>
    <router-outlet />
  `,
})
export class UserPage {
  // The blocking resource is bound to this input as a plain value
  readonly user = input.required<User>();
}

@Component({
  selector: 'app-activity-page',
  template: `
    <h3>Activity ({{ activity().range }})</h3>
    <ul>
      @for (item of activity().items; track item) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
})
export class ActivityPage {
  readonly activity = input.required<Activity>();
}

@Component({
  selector: 'app-feed-page',
  template: `
    <h3>Feed</h3>
    <!-- A non-blocking resource arrives as a Resource, so the page shows first -->
    @if (feed().isLoading()) {
      <p class="muted">Loading the feed...</p>
    } @else if (feed().error()) {
      <p class="notice">The feed could not be loaded: {{ feed().error()?.message }}</p>
    } @else {
      <ul>
        @for (post of feed().value(); track post) {
          <li>{{ post }}</li>
        }
      </ul>
    }
  `,
})
export class FeedPage {
  readonly feed = input.required<Resource<string[] | undefined>>();
}

// ---------------------------------------------------------------- resolvers (for comparison)

@Component({
  selector: 'app-resolver-user-page',
  imports: [RouterOutlet],
  template: `
    <h2>{{ user().name }} <span class="muted">({{ user().role }}) - loaded with resolvers</span></h2>
    <router-outlet />
  `,
})
export class ResolverUserPage {
  readonly user = input.required<User>();
}

@Component({
  selector: 'app-resolver-activity-page',
  template: `
    <h3>Activity ({{ activity().range }})</h3>
    <ul>
      @for (item of activity().items; track item) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
})
export class ResolverActivityPage {
  readonly activity = input.required<Activity>();
}

// ---------------------------------------------------------------- error boundary

@Component({
  selector: 'app-broken-page',
  template: `<p>You will never see this text.</p>`,
})
export class BrokenPage {
  constructor() {
    throw new Error('This page failed while it was being created');
  }
}

@Component({
  selector: 'app-error-fallback',
  template: `
    <h2>Something went wrong on this page</h2>
    <p class="notice">{{ error()?.message }}</p>
    <p class="muted">The rest of the app still works.</p>
  `,
})
export class ErrorFallback {
  // The router passes the caught error to this input
  readonly error = input<Error>();
}
