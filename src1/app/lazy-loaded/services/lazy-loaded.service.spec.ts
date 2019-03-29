import { TestBed } from '@angular/core/testing';

import { LazyLoadedService } from './lazy-loaded.service';

describe('LazyLoadedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyLoadedService = TestBed.get(LazyLoadedService);
    expect(service).toBeTruthy();
  });
});
