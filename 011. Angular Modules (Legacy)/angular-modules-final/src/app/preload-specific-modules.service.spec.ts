import { TestBed } from '@angular/core/testing';

import { PreloadSpecificModulesService } from './preload-specific-modules.service';

describe('PreloadSpecificModulesService', () => {
  let service: PreloadSpecificModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadSpecificModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
