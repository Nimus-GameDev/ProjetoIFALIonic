import { TestBed } from '@angular/core/testing';

import { CrudAreaService } from './crud-area.service';

describe('CrudAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudAreaService = TestBed.get(CrudAreaService);
    expect(service).toBeTruthy();
  });
});
