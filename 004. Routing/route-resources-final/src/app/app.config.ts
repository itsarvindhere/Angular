import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withErrorBoundaries,
  withRouterResources,
} from '@angular/router';
import { routes } from './app.routes';
import { ErrorFallback } from './pages';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Binds route data (resolvers and resources) to component inputs
      withComponentInputBinding(),
      // Turns on the "resources" property of a route
      withRouterResources(),
      // Shows a fallback page when a route component throws
      withErrorBoundaries({
        defaultErrorComponent: ErrorFallback,
        onError: (error) => console.error('Router error boundary caught:', error),
      }),
    ),
  ],
};
