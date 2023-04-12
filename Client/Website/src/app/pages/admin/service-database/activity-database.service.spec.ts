import { TestBed } from '@angular/core/testing';

import { ServiceDatabaseService } from './service-database.service';

describe('ActivityDatabaseService', () => {
  let service: ServiceDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
