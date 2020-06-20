import { TestBed } from '@angular/core/testing';

import { TeachersecService } from './teachersec.service';

describe('TeachersecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeachersecService = TestBed.get(TeachersecService);
    expect(service).toBeTruthy();
  });
});
