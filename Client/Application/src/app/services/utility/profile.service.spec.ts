import { ProfileService } from 'src/app/services/utility/profile.service';

import { TestBed } from '@angular/core/testing';


describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
