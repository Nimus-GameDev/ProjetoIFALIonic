import { TestBed } from '@angular/core/testing';

import { MapControllerService } from './map-controller.service';

describe('MapControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapControllerService = TestBed.get(MapControllerService);
    expect(service).toBeTruthy();
  });
});
