import { TestBed } from '@angular/core/testing';

import { AreasControllerService } from './areas-controller.service';

describe('AreasControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreasControllerService = TestBed.get(AreasControllerService);
    expect(service).toBeTruthy();
  });
});
