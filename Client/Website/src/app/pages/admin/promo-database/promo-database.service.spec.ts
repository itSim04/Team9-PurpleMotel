import { PromoCodeDatabaseService } from './promo-database.service';
import { TestBed } from '@angular/core/testing';


describe('PromoDatabaseService', () => {
  let service: PromoCodeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoCodeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
