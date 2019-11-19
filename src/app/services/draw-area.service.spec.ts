import { TestBed } from '@angular/core/testing';

import { DrawAreaService } from './draw-area.service';

describe('DrawAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrawAreaService = TestBed.get(DrawAreaService);
    expect(service).toBeTruthy();
  });
});
