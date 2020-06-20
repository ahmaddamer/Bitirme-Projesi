import { TestBed } from '@angular/core/testing';

import { AlinanderslerServiceService } from './alinandersler-service.service';

describe('AlinanderslerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlinanderslerServiceService = TestBed.get(AlinanderslerServiceService);
    expect(service).toBeTruthy();
  });
});
