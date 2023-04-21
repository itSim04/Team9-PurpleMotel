import { TestBed } from '@angular/core/testing';

import { NwesListPopupService } from './nwes-list-popup.service';

describe('NwesListPopupService', () => {
  let service: NwesListPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NwesListPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
