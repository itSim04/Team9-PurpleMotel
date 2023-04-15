import { TestBed } from '@angular/core/testing';

import { RegistrationDatabaseService } from './registration-database.service';

describe('RegistrationDatabaseService', () => {
  let service: RegistrationDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
