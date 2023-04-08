import { TestBed } from '@angular/core/testing';

import { ActivityDatabaseService } from './activity-database.service';

describe('ActivityDatabaseService', () => {
  let service: ActivityDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
