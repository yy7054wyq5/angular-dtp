import { TestBed } from '@angular/core/testing';

import { LazyLoadingLibService } from './lazy-loading-lib.service';

describe('LazyLoadingLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyLoadingLibService = TestBed.get(LazyLoadingLibService);
    expect(service).toBeTruthy();
  });
});
