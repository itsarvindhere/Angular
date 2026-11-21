import { inject, resource } from '@angular/core';
import { ResolveFn, Routes, nonBlocking } from '@angular/router';
import { Activity, Api, User } from './api';
import {
  ActivityPage,
  BrokenPage,
  FeedPage,
  Home,
  ResolverActivityPage,
  ResolverUserPage,
  UserPage,
} from './pages';

// Resolvers, for comparison: they run one after another and block the navigation
const userResolver: ResolveFn<User> = (route) => inject(Api).getUser(route.paramMap.get('id')!);
const activityResolver: ResolveFn<Activity> = (route) =>
  inject(Api).getActivity(route.paramMap.get('id')!, 'week');

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },

  // Route resources. The parent and the child load at the same time.
  {
    path: 'user/:id',
    component: UserPage,
    resources: (ctx) => {
      const api = inject(Api);
      return {
        user: resource({
          params: () => ctx.params()['id'] as string,
          loader: ({ params: id }) => api.getUser(id),
        }),
      };
    },
    children: [
      {
        path: '',
        component: ActivityPage,
        resources: (ctx) => {
          const api = inject(Api);
          return {
            // Re-runs when the "range" query parameter changes, and only then
            activity: resource({
              params: () => ({
                id: ctx.params()['id'] as string,
                range: (ctx.queryParams()['range'] as string | undefined) ?? 'week',
              }),
              loader: ({ params }) => api.getActivity(params.id, params.range),
            }),
          };
        },
      },
      {
        path: 'feed',
        component: FeedPage,
        resources: (ctx) => {
          const api = inject(Api);
          return {
            // Non-blocking: the page shows at once and reads isLoading() and error() itself
            feed: nonBlocking(
              resource({
                params: () => ctx.params()['id'] as string,
                loader: ({ params: id }) => api.getFeed(id),
              }),
            ),
          };
        },
      },
    ],
  },

  // The same pages with resolvers
  {
    path: 'resolver/:id',
    component: ResolverUserPage,
    resolve: { user: userResolver },
    children: [{ path: '', component: ResolverActivityPage, resolve: { activity: activityResolver } }],
  },

  // A page that throws while it is created: the error boundary shows the fallback
  { path: 'broken', component: BrokenPage },
];
