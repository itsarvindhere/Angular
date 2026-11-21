# route-resources-final

Sample project for the **Route Resources** and **Router Error Boundaries** notes (Routing section, notes 028 and 029). A small app with a slow fake backend, so you can see what each feature does and how long it takes.

Both features are in **developer preview** in Angular 22.3, so their API can still change.

| Note | Where to see it |
|------|-----------------|
| 028 Route resources | `resources` on the routes in [`src/app/app.routes.ts`](src/app/app.routes.ts), `withRouterResources()` in [`app.config.ts`](src/app/app.config.ts) |
| 028 Non-blocking resources | the `feed` route: `nonBlocking(resource(...))`, read as a `Resource` in `FeedPage` ([`pages.ts`](src/app/pages.ts)) |
| 021 and 028 Resolvers compared | the `resolver/:id` routes, which load the same data with `resolve` |
| 029 Error boundaries | `withErrorBoundaries()` in `app.config.ts`, the `broken` route and `ErrorFallback` |

## Run it

```bash
npm install
npm start
npm test
```

## Things to try

The fake backend ([`api.ts`](src/app/api.ts)) is slow on purpose: a user takes 800 ms, activity takes 600 ms, and the feed takes 1500 ms. The top of the page shows how long the last navigation took and how many requests of each kind have run.

1. **Parallel vs sequential.** Open "User 1" under *Route resources*, then "User 1" under *Resolvers*. The page and its child load at the same time with resources (about 800 ms) and one after the other with resolvers (about 1400 ms).
2. **Reactive.** On a user page, click "Activity: month". Only the activity request runs again, and the user request count does not change.
3. **Non-blocking.** Click "Feed (non-blocking)". The navigation finishes in a few milliseconds and the page shows "Loading the feed..." until the data arrives.
4. **A failing non-blocking resource.** Open "User 3", then the feed. This user's feed always fails, and the page shows the error from the resource's own `error()`, while everything else keeps working.
5. **A failing blocking resource.** Click "Unknown user". The navigation is cancelled and a message appears. The page you were on stays.
6. **Error boundary.** Click "Broken page". The component throws while it is created, and the router shows the fallback page instead.

## Not covered here

Dependent resources with `chain()` are described in note 028 but are not used in this project.
