import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadSpecificModulesService implements PreloadingStrategy {

  constructor() { }
  
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? fn() : of(null);
  }
}
