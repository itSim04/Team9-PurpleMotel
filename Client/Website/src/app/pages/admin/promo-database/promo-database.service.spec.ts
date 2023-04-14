import { TestBed } from '@angular/core/testing';

import { PromoCodeDatabaseService } from './promo-database.service';

describe('PromoCodeDatabaseService', () => {
  let service: PromoCodeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoCodeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
