import { TestBed } from '@angular/core/testing';

import { ProvincesCitiesMapService } from './provinces-cities-map.service';

describe('ProvincesCitiesMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvincesCitiesMapService = TestBed.get(ProvincesCitiesMapService);
    expect(service).toBeTruthy();
  });
});
