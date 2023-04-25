import { TestBed } from '@angular/core/testing';

import { BookingDatabaseService } from './booking-database.service';

describe('BookingDatabaseService', () => {
  let service: BookingDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
