import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AuthInterceptor } from "./app/auth/auth.interceptor";
import { PreloadAllModules, provideRouter, withPreloading } from "@angular/router";
import { routes } from "./app/app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
};