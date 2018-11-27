import { TestBed } from '@angular/core/testing';

import { MuiGridService } from './mui-grid.service';

describe('MuiGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuiGridService = TestBed.get(MuiGridService);
    expect(service).toBeTruthy();
  });
});
