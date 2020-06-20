import { TestBed } from '@angular/core/testing';

import { StudentsecService } from './studentsec.service';

describe('StudentsecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentsecService = TestBed.get(StudentsecService);
    expect(service).toBeTruthy();
  });
});
