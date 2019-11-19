import { TestBed } from '@angular/core/testing';

import { DrawMapService } from './draw-map.service';

describe('DrawMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrawMapService = TestBed.get(DrawMapService);
    expect(service).toBeTruthy();
  });
});
