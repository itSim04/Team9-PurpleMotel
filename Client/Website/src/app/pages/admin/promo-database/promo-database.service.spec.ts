import { TestBed } from '@angular/core/testing';
import { PromoDatabaseService } from './promo-database.service';


describe('PromoDatabaseService', () => {
  let service: PromoDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
