import { TestBed } from '@angular/core/testing';

import { ServerResolveService } from './serverimport { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YourResolver implements Resolve<ObjectToResolve> {
  resolve(route: ActivatedRouteSnapshot): Observable<ObjectToResolve> | Promise<ObjectToResolve> | ObjectToResolve {
    return ;
  }
}.service';

describe('ServerResolveService', () => {
  let service: ServerResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
