import { TestBed } from '@angular/core/testing';

import { FoodDatabaseService } from './food-database.service';

describe('FoodDatabaseService', () => {
  let service: FoodDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
