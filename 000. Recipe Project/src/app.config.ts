import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideLucideIcons, LucideMoveLeft, LucideSave, LucidePlusCircle, LucidePencil, LucideRotateCcw, LucideFilePlus, LucideTrash } from "@lucide/angular";
import { AuthInterceptor } from "./app/auth/auth.interceptor";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { routes } from "./app/app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideLucideIcons(LucideMoveLeft, LucideSave, LucidePlusCircle, LucideTrash, LucidePencil, LucideRotateCcw, LucideFilePlus),
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ]
};