import { TestBed } from '@angular/core/testing';

import { IslerserviceService } from './islerservice.service';

describe('IslerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IslerserviceService = TestBed.get(IslerserviceService);
    expect(service).toBeTruthy();
  });
});
