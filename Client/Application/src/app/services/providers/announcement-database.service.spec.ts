import { TestBed } from '@angular/core/testing';
import { AnnouncementDatabaseService } from './announcement-database.service';

describe('AnnouncementDatabaseService', () => {
  let service: AnnouncementDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
