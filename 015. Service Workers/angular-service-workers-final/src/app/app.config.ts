import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideServiceWorker } from "@angular/service-worker";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ]
};