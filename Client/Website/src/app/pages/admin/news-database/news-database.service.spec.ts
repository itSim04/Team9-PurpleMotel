import { TestBed } from '@angular/core/testing';
import { NewsDatabaseService } from './news-database.service';


describe('NewsDatabaseService', () => {
  let service: NewsDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
