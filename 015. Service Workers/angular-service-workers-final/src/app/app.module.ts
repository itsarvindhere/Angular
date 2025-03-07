import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({ declarations: [AppComponent, PostComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
